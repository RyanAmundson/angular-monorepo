import type { Meta, StoryObj } from '@storybook/angular';
import { GreeksComponent } from './greeks.component';

const meta: Meta<GreeksComponent> = {
  component: GreeksComponent,
  title: 'Components/GreeksComponent',
};
export default meta;
type Story = StoryObj<GreeksComponent>;

export const Primary: Story = {
  args: {
    greeks: [
      { symbol: 'Δ', value: 0.5 }, // Delta
      { symbol: 'Γ', value: 0.1 }, // Gamma
      { symbol: 'Θ', value: -0.2 }, // Theta
      { symbol: 'V', value: 0.3 }, // Vega
      { symbol: 'ρ', value: 0.05 }, // Rho
    ],
  },
};
