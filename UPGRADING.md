# Upgrading

Changes a host site can notice when it updates the `@micromag/*` packages, and what it must do. Story data doesn't change between these versions: stories already created render without any migration.

## From 0.4.123

### What a host must check

- **Server-rendered pages that preload the first video.** With the default `videoRendition: 'auto'`, the viewer chooses one H.264 rendering per session (`files.h264` or `files.h264_720`) once the story frame is measured on the client. Until then, on the server and during hydration, videos render as `<video>` **without any `<source>`**. A server-side `<link rel="preload">` of `files.h264` is then wasted on phones, which play `files.h264_720` when the video has it.
    - Either emit one preload per entry of `getVideoRenditionPreloads(media.files)` (`@micromag/core/utils`): two links with `media="(max-width: 430px)"` / `media="(min-width: 431px)"` when the video has both renderings, one link otherwise;
    - or force the rendering with `settings={{ videoRendition: 'h264' }}` (or `'h264_720'`): the server then renders that `<source>` as before.
    - Chrome ignores `<link rel="preload" as="video">` (it logs "`<link rel=preload>` uses an unsupported `as` value"), so in Chrome the first video starts downloading after hydration in `auto`, whatever the host preloads. Forcing `videoRendition` is the only way to keep the `<source>` in the server HTML.
- **TypeScript props removed with HLS.** `qualityStartLevel` and `onQualityLevelChange` are no longer props of `Background`, `BackgroundLayers`, `Visual` and the video screens. HLS was never exported (`VideoHls` and `hls.js` are gone). `PlaybackContext.currentQualityLevel` is kept, unused.
- **Browser targets.** The packages are built for iOS / Safari 16.4+, Chrome, Edge, Firefox and the Android WebView 111+, Samsung Internet 22+ and Opera 97+ (browsers released since spring 2023). CSS prefixes for older browsers are gone.
- **Host stylesheets keyed on webfontloader.** The viewer no longer runs webfontloader: the `wf-active` / `wf-*` classes are no longer added to `<html>`.

### Visible changes, nothing to do

- Video backgrounds no longer show `thumbnail_url` as a poster until playback, and backgrounds/visuals no longer show it while the video isn't loaded (it is still shown in previews).
- Fonts use `font-display: swap` (text shows in the fallback font, then swaps), and only the faces used by the mounted screens are downloaded. Google Fonts are added to `<head>` from an effect, with preconnect links. `FontFaces` drops the `eot` and `svg` formats.
- Images are requested at the size they are shown, with the device pixel ratio capped at 2. `getOptimalImageUrl`'s `maxDiff` is ignored (deprecated). Images without a description get `alt=""` instead of `"image"`.
- Google Maps is loaded the first time a map screen or element mounts, not when `GoogleMapsClientProvider` mounts. `GoogleMapsClientContext.Consumer` used directly no longer triggers a load.
- A screen that throws shows a fallback ("This screen could not be displayed.") instead of unmounting the viewer. New optional prop `onScreenError(error, { screen, index, componentStack })` to log it.
- Readers with `prefers-reduced-motion: reduce` get immediate screen changes and no decorative animations.
- Full-page or fullscreen viewers pad their menu and controls with `env(safe-area-inset-*)` (needs `viewport-fit=cover` on the page). `overscroll-behavior: contain` is set on `body` only while the viewer fills the viewport, and restored after.
- Off-screen neighbour screens are `inert`. Keyboard shortcuts: with several viewers on a page, only the focused one (or the last one touched) responds.
- Closed captions are fetched when their screen becomes current, not one screen ahead.
- The next screen starts preloading as soon as the current screen's media can play (`neighborPreloadDelay` is now an upper bound).
- 360 video and image screens draw their sphere again (they were broken with three 0.163).
- Share buttons and icons are rendered without `react-share` and the Font Awesome runtime, with the same links, class names and sizes.

### New exports

- `@micromag/core/utils`: `getVideoRendition`, `getVideoRenditionFile`, `getVideoRenditionPreloads`, `VIDEO_RENDITIONS`, `VIDEO_RENDITION_RULES`, `addStylesheet`, `getGoogleFontsUrl`, `sanitizeUserInput`, `loadUserInputSanitizer`.
- `@micromag/core/contexts`: `VideoRenditionContext`, `VideoRenditionProvider`, `useVideoRendition`. `@micromag/core/hooks`: `usePrefersReducedMotion`. `@micromag/core/components`: `InlineIcon`, `GoogleFonts`.
- `@micromag/viewer`: the `ViewerSettings` type (`videoRendition: 'auto' | 'h264' | 'h264_720'`) and the `ViewerTransitionMetric` types.

### `@micromag/viewer-build`

- Stories with fonts no longer crash the standalone viewer (`TypeError: t is not a function`).
- `window.MICROMAG_PUBLIC_PATH` is honoured again, so a build served under a sub-path loads its async chunks (360 screens, DOMPurify).
