"""Deployment packaging and Flask integration checks; no live API calls."""
import importlib
import os
from pathlib import Path
import tempfile
import unittest
from types import SimpleNamespace
from unittest.mock import Mock, patch

from prepare_vercel import prepare_public
from public_assets import PUBLIC_FILES, PUBLIC_ROOT


class PublicBuildTests(unittest.TestCase):
    def test_only_approved_files_are_copied_and_build_is_repeatable(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in PUBLIC_FILES:
                target = root / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes((PUBLIC_ROOT / name).read_bytes())
            (root / '.env').write_text('NOT_A_REAL_SECRET=fixture')
            self.assertEqual(prepare_public(root), len(PUBLIC_FILES))
            self.assertEqual(prepare_public(root), len(PUBLIC_FILES))
            copied = {p.relative_to(root / 'public').as_posix() for p in (root / 'public').rglob('*') if p.is_file()}
            self.assertEqual(copied, PUBLIC_FILES)
            for name in copied:
                self.assertEqual((root / name).read_bytes(), (root / 'public' / name).read_bytes())
            (root / 'public' / 'private.txt').write_text('unexpected build output')
            with self.assertRaises(ValueError):
                prepare_public(root)

    def test_missing_source_fails_before_creating_public(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            with self.assertRaises(FileNotFoundError):
                prepare_public(root)
            self.assertFalse((root / 'public').exists())


class CloudAppTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.environment = patch.dict(os.environ, {'VERCEL': '1', 'GEMINI_API_KEY': 'deployment-test-placeholder', 'GEMINI_MODEL': ''})
        cls.environment.start()
        cls.server = importlib.import_module('server')
        cls.client = cls.server.app.test_client()

    @classmethod
    def tearDownClass(cls):
        cls.environment.stop()

    def test_cloud_config_never_reads_local_secrets(self):
        with patch('builtins.open', side_effect=AssertionError('Local file read')):
            self.assertEqual(self.server._load_secrets_toml(), {})

    def test_frontend_and_video_ranges(self):
        for name in sorted(PUBLIC_FILES):
            with self.subTest(name=name):
                response = self.client.get('/' + name)
                self.assertEqual(response.status_code, 200)
                response.close()
        response = self.client.get('/assets/signal-scene.mp4', headers={'Range': 'bytes=0-99'})
        self.assertEqual(response.status_code, 206)
        self.assertEqual(len(response.data), 100)
        response.close()
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        response.close()

    def test_private_files_are_not_served(self):
        for path in ['/server.py', '/public_assets.py', '/prepare_vercel.py', '/.env', '/.streamlit/secrets.toml', '/vercel.json']:
            with self.subTest(path=path):
                self.assertEqual(self.client.get(path).status_code, 404)

    def test_api_stays_dynamic_and_chat_reaches_sdk(self):
        generate = Mock(return_value=SimpleNamespace(text='My CodeAlpha internship ran from 10 August to 10 September 2026.'))
        fake_client = SimpleNamespace(models=SimpleNamespace(generate_content=generate))
        with patch.object(self.server, '_get_client', return_value=fake_client):
            result = self.client.post('/api/chat', json={'message': 'When was your internship?', 'history': []})
        self.assertEqual(result.status_code, 200)
        self.assertIn('10 September 2026', result.get_json()['response'])
        self.assertEqual(result.headers['Cache-Control'], 'no-store')
        self.assertEqual(generate.call_args.kwargs['model'], 'gemini-3.5-flash-lite')
        self.assertIn('10 August 2026', generate.call_args.kwargs['config'].system_instruction)
        for path in ['/api/health', '/api/config']:
            result = self.client.get(path)
            self.assertEqual(result.status_code, 200)
            self.assertEqual(result.headers['Cache-Control'], 'no-store')
            self.assertNotIn('deployment-test-placeholder', result.get_data(as_text=True))

    def test_explicit_model_override_is_still_supported(self):
        generate = Mock(return_value=SimpleNamespace(text='I study Information Technology.'))
        fake_client = SimpleNamespace(models=SimpleNamespace(generate_content=generate))
        with patch.object(self.server, 'GEMINI_MODEL', 'gemini-3.6-flash'), patch.object(self.server, '_get_client', return_value=fake_client):
            response = self.client.post('/api/chat', json={'message': 'What do you study?', 'history': []})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(generate.call_args.kwargs['model'], 'gemini-3.6-flash')
        self.assertIsNotNone(generate.call_args.kwargs['config'].thinking_config)


if __name__ == '__main__':
    unittest.main()
