import type { Meta, StoryObj } from '@storybook/angular';
import { BuyButtonComponent } from './buy-button.component';

const meta: Meta<BuyButtonComponent> = {
  component: BuyButtonComponent,
  title: 'Components/OptionCard/BuyButtonComponent',
};
export default meta;
type Story = StoryObj<BuyButtonComponent>;

export const Primary: Story = {
  args: {},
};
