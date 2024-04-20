import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // TODO: Investigate why this here...
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;
