# Hero background video

`hero-background.mp4` is in place — H.264, no audio track, 1920×1080, ~1.6MB, 11s loop, faststart-enabled for progressive playback.

Optional: add `hero-background.webm` (VP9/AV1) for a smaller file size on supporting browsers — it's listed first in the `<source>` order in `HeroVideoBackground.tsx`, so it's picked up automatically once present. Not required.

To swap in different footage later, re-encode with something like:

```
ffmpeg -i input.mp4 -vf "scale=1920:-2" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart hero-background.mp4
```

This scales to 1080p, strips audio (the video is always muted in the browser, so audio is dead weight), and keeps the file small since it plays behind heavy gradient overlays at reduced opacity.
