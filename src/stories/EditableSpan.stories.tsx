import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableSpan } from '../components/EditableSpan';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
   title: 'TODOLISTS/EditableSpan',
   component: EditableSpan,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ['autodocs'],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes
   args: { onClick: fn(), title: 'HTML' },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {
   //    args: {
   //       addItem: action('Button clicked'),
   //    },
};
