# Video reference analysis

Source: C:/Users/admin/Videos/2026-11-14 11-18-08.mp4
Recording: 59.30 seconds, 1280 × 720, 30 fps.
Reference page identified in the video:
https://gitskins.com/portfolio-templates/naresh-keyboard/standalone/?username=aniketsidhu123

The recording was sampled at one-second intervals across its full duration. Stationary hero views, scrolling sections, and key interaction frames were compared with the reference's public composition and styles.

## Sequence

| Recording time | Observed content and movement | Implementation |
| --- | --- | --- |
| 0–2 s | Hero: compact brand/nav, two-line name, cyan period, GitHub action, floating character and glass shapes | Full-height hero with exact reference scene and gradient overlays |
| 3–5 s | Ordinary vertical scroll into “A stack you can see”; small language-signal panel at the right | Two-column skills section with tightly tracked Unbounded heading and six signal chips |
| 5–6 s | GitHub profile panel with avatar, bio, three metric cells | Profile panel fed by public GitHub snapshot and optional live refresh |
| 7–8 s | “Built in the open”; six repository cards in three columns | Same hierarchy, spacing, card treatment, descriptions and metadata |
| 9 s | Centered “Follow the signal” heading and cyan GitHub pill | Matching closing composition and action |
| 10–17 s | Return scroll to hero; glass geometry and character scene continuously loop | The original local scene video loops independently of page scrolling |
| 18–42 s | Scrolls repeated and external GitHub profile/repository links opened | Real repository/profile links with ordinary browser navigation |
| 43–49 s | Extended hero view showing object rotation, drifting orbital lines and floating geometry | Reference motion retained by using the same rendered scene asset |
| 49–58 s | Skill keys pressed; pressed-key displacement, colored outline, and explanatory text change | Native buttons with press/release states, optional reference audio, selected state and live description |

## Visual system

- Near-black navy background (#030916), white text, muted blue-gray body copy, cyan accent, and violet detail text.
- Space Grotesk body and Unbounded display type, served locally.
- Fixed transparent header with a top fade; avatar and name at left; Skills, Work, GitHub at right.
- Left-aligned name and biography; character occupies the right side behind a floating, tilted six-key keyboard.
- The hero scene is rendered video in the reference; keyboard buttons are separate CSS 3D elements. This implementation follows that same approach rather than inventing a different WebGL scene.
- Keyboard orientation: perspective 1200px, rotateX(57deg), rotateZ(-17deg), scale(.82); physical key travel on press.
- Rounded translucent panels, thin blue-gray borders, pill actions and signal chips; project hover lifts by 7px.
- The full main page follows the reference flow. Existing resume, AI assistant and contact functions are available through secondary footer dialogs.

## Motion and fallback behavior

The rendered scene keeps its original motion/timing. Button and key transitions use the reference's short 120–250ms movement. Native smooth anchor scrolling preserves the video's vertical flow without a scrolling dependency. Background video pauses when offscreen or the document is hidden. Touch/mobile and reduced-motion visitors receive the poster; buttons and content remain usable. A scene pause control and a key sound toggle provide explicit control.

The live profile totals may differ from the recording because current public GitHub data is used. A verified local snapshot keeps all primary content available offline.
