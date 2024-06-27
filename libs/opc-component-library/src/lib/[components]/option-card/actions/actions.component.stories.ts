import type { Meta, StoryObj } from '@storybook/angular';
import { ActionsComponent } from './actions.component';

const meta: Meta<ActionsComponent> = {
  component: ActionsComponent,
  title: 'Components/OptionCard/ActionsComponent',
};
export default meta;
type Story = StoryObj<ActionsComponent>;

export const Primary: Story = {
  args: {},
};
