import type { Meta, StoryObj } from '@storybook/angular';
import { SellButtonComponent } from './sell-button.component';

const meta: Meta<SellButtonComponent> = {
  component: SellButtonComponent,
  title: 'Components/OptionCard/SellButtonComponent',
};
export default meta;
type Story = StoryObj<SellButtonComponent>;

export const Primary: Story = {
  args: {},
};
