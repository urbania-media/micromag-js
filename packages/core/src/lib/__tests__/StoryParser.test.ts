/**
 * Regression test of StoryParser: published stories have no version field, so the parser and its
 * migrations are what keeps them rendering the same. Any change to the output of the parser shows
 * up here as a snapshot diff.
 *
 * - fixtures/*.json: synthetic stories, one per migration and legacy shape, with full snapshots;
 * - .storybook/data/stories/*.json: the stories already in the repo, with full snapshots for the
 *   small ones and a digest (one hash per screen) for the others, to keep the repo light;
 * - local/stories/*.json (ignored by git, or MICROMAG_STORIES_DIR): real stories, to compare the
 *   output before and after a change on your machine. See local/README.md.
 */
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { describe, expect, test } from 'vitest';

import * as migrations from '../migrations/index';
import createViewerStoryParser from './createViewerStoryParser';

type Story = {
    components?: Record<string, unknown>[];
    theme?: unknown;
    medias?: Record<string, unknown> | null;
    fonts?: { type?: string; name?: string }[] | null;
    [key: string]: unknown;
};

const rootDir = path.resolve(__dirname, '../../../../..');
const fixturesDir = path.join(__dirname, 'fixtures');
const storybookDir = path.join(rootDir, '.storybook/data/stories');
const localDir = process.env.MICROMAG_STORIES_DIR || path.join(__dirname, 'local/stories');
const localSnapshotsDir = path.join(
    process.env.MICROMAG_STORIES_DIR ? path.dirname(localDir) : path.join(__dirname, 'local'),
    '__snapshots__',
);

// Stories of .storybook small enough to keep their full output in the repo
const FULL_STORYBOOK_SNAPSHOTS = ['all-screens.json', 'basic.json', 'default-story.json'];

const parser = createViewerStoryParser();

const listJsonFiles = (dir: string): string[] =>
    fs.existsSync(dir)
        ? fs
              .readdirSync(dir)
              .filter((file) => file.endsWith('.json'))
              .sort()
        : [];

// A story file can hold the story itself or wrap it (ex.: { screenId, story })
const readStory = (file: string): Story | null => {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data !== null && Array.isArray(data.components)) {
        return data;
    }
    if (data !== null && data.story && Array.isArray(data.story.components)) {
        return data.story;
    }
    return null;
};

const toJson = (value: unknown) => `${JSON.stringify(value, null, 4)}\n`;

const hash = (value: unknown) =>
    createHash('sha256')
        .update(JSON.stringify(value === undefined ? null : value))
        .digest('hex')
        .slice(0, 16);

// A light summary of the output: which screen changed, without storing the whole story
const digest = (story: Story) => {
    const { components = [], theme = null, medias = null, fonts = null, ...rest } = story;
    return {
        components: components.map(
            (screen, index) => `${index} ${screen.type} ${screen.id} ${hash(screen)}`,
        ),
        theme: hash(theme),
        medias: medias !== null ? `${Object.keys(medias).length} ${hash(medias)}` : null,
        fonts: (fonts || []).map((font) => `${font?.type} ${font?.name}`),
        rest: hash(rest),
    };
};

describe('StoryParser', () => {
    test('returns null for a null story', () => {
        expect(parser.parse(null)).toBeNull();
    });

    describe('synthetic fixtures', () => {
        test.each(listJsonFiles(fixturesDir))('%s', async (file) => {
            const story = readStory(path.join(fixturesDir, file));
            const before = toJson(story);
            const parsed = parser.parse(story);
            // The parser must never change the story it receives (the viewer keeps it)
            expect(toJson(story)).toBe(before);
            await expect(toJson(parsed)).toMatchFileSnapshot(
                path.join(__dirname, '__snapshots__/fixtures', file),
            );
        });

        test('each migration is covered by a fixture', () => {
            const screens = listJsonFiles(fixturesDir).flatMap(
                (file) => readStory(path.join(fixturesDir, file))?.components || [],
            );
            Object.keys(migrations).forEach((name) => {
                const migration = new migrations[name]();
                const covered = screens.some((screen) => migration.test(screen));
                expect(covered, `no fixture screen triggers the ${name} migration`).toBe(true);
            });
        });
    });

    describe('stories of .storybook', () => {
        const files = listJsonFiles(storybookDir).filter(
            (file) => readStory(path.join(storybookDir, file)) !== null,
        );
        test.each(files)('%s', async (file) => {
            const parsed = parser.parse(readStory(path.join(storybookDir, file)));
            const full = FULL_STORYBOOK_SNAPSHOTS.includes(file);
            await expect(toJson(full ? parsed : digest(parsed))).toMatchFileSnapshot(
                path.join(__dirname, '__snapshots__/storybook', file),
            );
        });
    });

    const localFiles = listJsonFiles(localDir);
    describe.skipIf(localFiles.length === 0)(`local stories (${localDir})`, () => {
        test.each(localFiles)('%s', async (file) => {
            const story = readStory(path.join(localDir, file));
            expect(story, `${file} has no components`).not.toBeNull();
            await expect(toJson(parser.parse(story))).toMatchFileSnapshot(
                path.join(localSnapshotsDir, file),
            );
        });
    });
});
