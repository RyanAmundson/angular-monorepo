import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { OptionExplorerComponent } from './option-explorer.component';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { TradierService } from '../../[services]/tradier.service';
import { HttpClient, HttpClientModule, HttpHandler, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


const meta: Meta<OptionExplorerComponent> = {
  component: OptionExplorerComponent,
  title: 'Components/Option Explorer',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient(withInterceptorsFromDi()), TradierService],
    }),
    moduleMetadata({
      imports: [
        NoopAnimationsModule
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<OptionExplorerComponent>;

export const Primary: Story = {
  args: {
    ticker: 'AAPL',
  },
};
