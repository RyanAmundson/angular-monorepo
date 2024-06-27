import type { Meta, StoryObj } from '@storybook/angular';
import { OptionsWizardComponent } from './options-wizard.component';

const meta: Meta<OptionsWizardComponent> = {
  component: OptionsWizardComponent,
  title: 'OptionsWizardComponent',
};
export default meta;
type Story = StoryObj<OptionsWizardComponent>;

export const Primary: Story = {
  args: {},
};
