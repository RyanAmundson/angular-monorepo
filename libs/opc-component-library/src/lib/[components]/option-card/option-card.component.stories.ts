import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OptionCardComponent } from '../option-card/option-card.component'; // Adjust the import path as necessary
import { Option, OptionActions, OptionSaleTypes } from '../../[models]/models'; // Adjust the import path as necessary
// import { SelectedOptionsService } from '../app/services/selected-options.service'; // Adjust the import path as necessary
// import { NotifyUI } from '../app/services/notify-ui.service'; // Adjust the import path as necessary
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


const meta: Meta<OptionCardComponent> = {
  title: 'Components/OptionCard/OptionCard',
  component: OptionCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatBadgeModule,
        MatTooltipModule,
        NoopAnimationsModule
      ],
      providers: [
      ],
    }),
  ],
  argTypes: {
    callOption: { control: 'object' },
    putOption: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<OptionCardComponent>;

const mockCallOption: Option = {
  id: '1',
  tradierSymbol: 'AAPL150',
  ticker: 'AAPL',
  underlyingStockPrice: 150.25,
  type: 'option', // from tradier
  expiry:  '2023-12-31',
  strike: 150,
  last: 5.10,
  bid: 5.00,
  ask: 5.20,
  impliedVolatility: 0.25,
  openInterest: 1000,
  currentOptionPrice: 5.15,
  callOrPut: 'C',
  buyOrSell: OptionActions.Buy,
  delta: 0.5,
  gamma: 0.1,
  vega: 0.2,
  rho: 0.01,
  covered: false,
  coveredOrNaked: OptionSaleTypes.Naked,
  greeks: {
    smv_vol: '0.3',
    delta: '0.5',
    gamma: '0.1',
    theta: '0.2',
  },
  date: '2023-01-01',
  count: signal(1),
};

const mockPutOption: Option = {
  id: '1',
  tradierSymbol: 'AAPL150',
  ticker: 'AAPL',
  underlyingStockPrice: 150.25,
  type: 'option', // from tradier
  expiry:  '2023-12-31',
  strike: 150,
  last: 5.10,
  bid: 5.00,
  ask: 5.20,
  impliedVolatility: 0.25,
  openInterest: 1000,
  currentOptionPrice: 5.15,
  callOrPut: 'P',
  buyOrSell: OptionActions.Buy,
  delta: 0.5,
  gamma: 0.1,
  vega: 0.2,
  rho: 0.01,
  covered: false,
  coveredOrNaked: OptionSaleTypes.Naked,
  greeks: {
    smv_vol: '0.3',
    delta: '0.5',
    gamma: '0.1',
    theta: '0.2',
  },
  date: '2023-01-01',
  count: signal(1),
};



export const Default: Story = {
  args: {
    flipToPutSide: false,
    callOption: mockCallOption,
    putOption: mockPutOption,
  },
};

// export const WithPositiveCount: Story = {
//   args: {
//     callOption: mockCallOption,
//     putOption: mockPutOption,
//   },
// };

// export const WithNegativeCount: Story = {
//   args: {
//     callOption: mockCallOption,
//     putOption: mockPutOption,
//   },
// };
