
import { moduleMetadata, Meta, componentWrapperDecorator } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';


export const decorators = [
  moduleMetadata({
    imports: [BrowserModule], // Ensures proper rendering of components
  }),
  componentWrapperDecorator((story) =>
    `<style>
                 body, html {
                   margin: 0;
                   padding: 0;
                   height: 100vh;
                   width: 100vw;
                   overflow-x: hidden;
                 }
                   .mat-mdc-tab-body-content {
                   height:100%;
                   }
                   .mat-mdc-tab-body-wrapper {
                    height: 100%;
                    display: flex;
                  }
                 /* Add other global styles here */
               </style>
               
    <div>
    Preview.ts Wrapper: height: 80vh; width: 80vw;
    </div>
    <div 
  style="background:beige;position:relative; height: 80vh; width: 80vw; margin: 0; padding: 0;box-sizing: border-box; display:flex; align-items:center; justify-content:center">

  ${story}
  </div>`)
];
