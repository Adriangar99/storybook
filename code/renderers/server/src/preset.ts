// eslint-disable-next-line import/no-unresolved
import * as fse from 'fs-extra/esm';
import yaml from 'yaml';
import type { Tag, StoryName, ComponentTitle, PresetProperty } from '@storybook/types';

import { join } from 'node:path';

type FileContent = {
  title: ComponentTitle;
  tags?: Tag[];
  stories: { name: StoryName; tags?: Tag[] }[];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const experimental_indexers: PresetProperty<'experimental_indexers'> = (
  existingIndexers
) => [
  {
    test: /(stories|story)\.(json|ya?ml)$/,
    createIndex: async (fileName) => {
      const content: FileContent = fileName.endsWith('.json')
        ? await fse.readJson(fileName, 'utf-8')
        : yaml.parse((await fse.readFile(fileName, 'utf-8')).toString());

      return content.stories.map((story) => {
        const tags = Array.from(new Set([...(content.tags ?? []), ...(story.tags ?? [])]));
        return {
          importPath: fileName,
          exportName: story.name,
          name: story.name,
          title: content.title,
          tags,
          type: 'story',
        };
      });
    },
  },
  ...(existingIndexers || []),
];

export const previewAnnotations: PresetProperty<'previewAnnotations'> = async (
  input = [],
  options
) => {
  const { presetsList } = options;
  if (!presetsList) {
    return input;
  }
  const result: string[] = [];

  return result.concat(input).concat([join(__dirname, 'entry-preview.js')]);
};
