import type { Meta, StoryObj } from '@storybook/angular';
import { BorderRadiusLayoutComponent } from './border-radius-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<BorderRadiusLayoutComponent> = {
  component: BorderRadiusLayoutComponent,
  title: 'BorderRadiusLayoutComponent',
};
export default meta;
type Story = StoryObj<BorderRadiusLayoutComponent>;

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
