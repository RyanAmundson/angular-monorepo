import { animate, animateChild, group, query, sequence, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
// import { page1ToPage2, page2ToPage1, page2ToPage3, page3ToPage2 } from './_animations/route-animations';

import { CommonModule } from '@angular/common';


enum StepTransition {
  StepOneToStepTwo = `StepOneToStepTwo`,
  StepTwoToStepOne = `StepTwoToStepOne`,
}

@Component({
  selector: 'opc-options-wizard',
  templateUrl: './options-wizard.component.html',
  styleUrls: ['./options-wizard.component.scss'],
  imports: [
    CommonModule,
  ],
  standalone: true,
  animations: [
    trigger('StepChange', [
      transition(StepTransition.StepOneToStepTwo, [
        sequence([
          //works but only if a trigger is registered for Select Ticker below (even if its empty)
          query('@SelectTicker div', animateChild()),
          query('@TickerInfoPane div', animateChild()),
          query('@SelectContracts @*', animateChild({ delay: '300ms' })),
          //   // style({ opacity: 0 }),
          //   // animate('300ms', style({ opacity: 1 })), // This handles the initial animation with delay
          //   animateChild(), // Then animate the child animateChild({ delay: '300ms' })),
          // ),
          query('@SelectionDetails', animateChild()),

        ]),
      ]),
      transition(StepTransition.StepTwoToStepOne, [
        group([
          query('@SelectionDetails', animateChild()),
          query('@SelectContracts', animateChild()),
          query('@TickerInfoPane', animateChild()),
          query('@SelectTicker div', animateChild()),
        ]),
      ])
    ]),

    trigger('TickerInfoPane', [
      transition(':enter', [
        //   style({
        //     opacity: 0,
        //   }),
        //   animate('300ms', style({
        //     opacity: '1'
        //   }))
      ])
    ]),

    trigger('SelectTicker', [
      transition(':enter', [
      ]),
      transition(':leave', [
        //   group([
        //     query('@*', animateChild()),
        //     query(':self', animateChild()),
        //   ])
        // ]),
        // transition(':enter', [
        //   animateChild(),
      ])
    ]),

    trigger('SelectContracts', [
      transition(':enter', [
        //   animate('300ms', style({})),
        //   query('@*', animateChild({ delay: '1000ms' }), { optional: true }),
      ]),
      transition(':leave', [
      ])
    ]),

    trigger('SelectionDetails', [
      transition(':enter', [
        //   group([
        //     style({
        //       opacity: 0.7
        //     }),
        //     animate('300ms ease-in', style({
        //       opacity: 1
        //     })),
        //     animateChild(),
        //   ])
      ]),
    ])
  ]
})
export class OptionsWizardComponent {
  contexts = inject(ChildrenOutletContexts);

  animating = signal(false);

  currentStep = signal(1);

  showNextStep = computed(() => true);

  showPreviousStep = computed(() => true);

  showFixedTop = computed(() => true);

  showBottomMenu = computed(() =>
    true
  );


  goToNextStep() {
    this.currentStep.update((step: number) => (step + 1) % 3);
  }

  goToPreviousStep() {
    this.currentStep.update((step: number) => (step - 1) % 3);
  }

  goToStep(step: number) {
    this.currentStep.set(step);
  }

  animationStatusChange(event:any) {
    // this.animating.set(event.fromState !== 'void');
  }
}
