import { Meta, StoryObj } from '@storybook/angular';
import { StockPriceComponent } from '../stock-price/stock-price.component';

const meta: Meta<StockPriceComponent> = {
  title: 'Components/StockPrice',
  component: StockPriceComponent,
  decorators: [],
  argTypes: {
    price: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<StockPriceComponent>;

export const Default: Story = {
  args: {
    price: 12345.67,
  },
};

export const ChangingPrice: Story = {
  args: {
    price: 15078.89,
  },
};

let counter = 0;

export const DynamicPrice: Story = {
  render: (args) => ({
    props: {
      ...args,
      get price() {
        counter += 1;
        return 10000 + (counter % 10000) + (Math.random() * 10000);
      }
    },
    template: `<opc-stock-price [price]="price"></opc-stock-price>`,
  }),
};
