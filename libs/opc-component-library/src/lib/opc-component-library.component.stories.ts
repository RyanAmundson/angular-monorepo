import type { Meta, StoryObj } from '@storybook/angular';
import { OpcComponentLibraryComponent } from './opc-component-library.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<OpcComponentLibraryComponent> = {
  component: OpcComponentLibraryComponent,
  title: 'OpcComponentLibraryComponent',
};
export default meta;
type Story = StoryObj<OpcComponentLibraryComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/opc-component-library works!/gi)).toBeTruthy();
  },
};
