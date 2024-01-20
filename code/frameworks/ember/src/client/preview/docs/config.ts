import type { ArgTypesEnhancer } from '@storybook/core/dist/modules/types/index';
import { enhanceArgTypes } from '@storybook/docs-tools';

import { extractArgTypes, extractComponentDescription } from './jsondoc';

export const parameters: {} = {
  docs: {
    story: { iframeHeight: '80px' },
    extractArgTypes,
    extractComponentDescription,
  },
};

export const argTypesEnhancers: ArgTypesEnhancer[] = [enhanceArgTypes];
