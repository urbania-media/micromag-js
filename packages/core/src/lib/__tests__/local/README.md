# Real stories for the StoryParser test

Everything in this folder but this file is ignored by git. Put the JSON of real published stories
in `stories/` to check that a change doesn't alter how they are parsed. Never commit them: the
repository is public.

## Get stories

Any JSON that holds a story (`{ components, theme, medias, ... }`, or `{ story: { ... } }`) works.
Stories published on microm.ag can be downloaded by slug or URL:

```bash
npm run test:parser:fetch -- <slug> <slug> https://microm.ag/<slug>
```

Prefer recent stories, from several sources and with different screen types (videos, quiz, keypad,
custom fonts, themes): the stories of `.storybook` are old.

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

## In CI

On pull requests, the `Parser on recent stories` job of the Test workflow downloads the stories
listed in the repository secret `MICROMAG_PARSER_STORIES` (slugs or URLs, separated by spaces or new
lines; Settings → Secrets and variables → Actions). It's a secret and not a variable so that the
list is masked in the logs. The job parses the stories with the code of the base branch, then with
the code of the pull request, and fails if the output changed. The logs are public: only a digest
of each story is stored and shown (a hash per screen), and the files are named `story-1.json`,
`story-2.json`... in the order of the list. To see the change itself, run the local mode on the same
stories. The job is skipped while the secret is empty, and on pull requests from forks.
