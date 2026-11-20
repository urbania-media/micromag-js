# Real stories for the StoryParser test

Everything in this folder but this file is ignored by git. Put the JSON of real published stories
in `stories/` to check that a change doesn't alter how they are parsed. Never commit them: the
repository is public.

## Get stories

Any JSON that holds a story (`{ components, theme, medias, ... }`, or `{ story: { ... } }`) works.
A story published on microm.ag can be downloaded with its slug:

```bash
mkdir -p packages/core/src/lib/__tests__/local/stories
curl -sf "https://microm.ag/<slug>.json" -o packages/core/src/lib/__tests__/local/stories/<slug>.json
```

Pick stories from several years and with different screen types (videos, quiz, keypad, custom
fonts, themes).

## Compare before and after a change

1. On the base branch, record the output of the parser:

    ```bash
    npm run test:parser -- --update
    ```

    The snapshots are written in `local/__snapshots__/` (ignored too).

2. On your branch, run the test again without `--update`:

    ```bash
    npm run test:parser
    ```

    A failing story shows the diff of its parsed output.

To use another folder, set `MICROMAG_STORIES_DIR=/path/to/stories`: the snapshots then go in
`/path/to/__snapshots__/`.
