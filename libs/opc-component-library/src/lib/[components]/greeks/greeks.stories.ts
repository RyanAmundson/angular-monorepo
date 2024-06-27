import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { GreeksComponent } from './greeks.component';


const meta: Meta<GreeksComponent> = {
  title: 'Components/Greeks',
  component: GreeksComponent,
  decorators: [
    moduleMetadata({
      imports: [
      ],
      providers: [
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<GreeksComponent>;


export const Default: Story = {
  args: {
  },
};

export const WithPositiveCount: Story = {
  args: {
  },
};

export const WithNegativeCount: Story = {
  args: {
  },
};
