import type { Meta, StoryObj } from '@storybook/angular';
import { BorderRadiusLayoutDragComponent } from './border-radius-layout-drag.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<BorderRadiusLayoutDragComponent> = {
  component: BorderRadiusLayoutDragComponent,
  title: 'Layouts/Border Radius Layout (Pan)',
};
export default meta;
type Story = StoryObj<BorderRadiusLayoutDragComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/border-radius-layout works!/gi)).toBeTruthy();
  },
};
