// import { Component, EventEmitter, forwardRef, OnInit, Output, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import Lookups = app.common.lookups;
// import Pipeline = app.common.lookups.Pipeline;
// import Stage = app.common.lookups.Stage;
// import PipelineStageModel = app.common.lookups.PipelineStageModel;

// @Component({
//     selector: 'pipeline-stage-selector',
//     templateUrl: './pipeline-stage-selector.component.html',
//     styleUrls: ['./pipeline-stage-selector.component.scss'],
//     providers: [
//         {
//             provide: NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => PipelineStageSelectorComponent),
//             multi: true
//         }
//     ]
// })
// export class PipelineStageSelectorComponent implements OnInit, ControlValueAccessor {
//     @Input() cssClass: string;
//     @Input() pipelineId: Pipeline;
//     @Output() onValueChange = new EventEmitter<Stage>();

//     pipelineStages: PipelineStageModel[];
//     onChange = () => { };
//     onTouched = () => { };
//     currentStageId: Stage;

//     get value(): Stage {
//         return this.currentStageId;
//     }

//     set value(pipelineStageId: Stage) {
//         this.currentStageId = pipelineStageId;
//         this.onValueChange.emit(pipelineStageId);
//     }

//     ngOnInit() {
//         this.pipelineStages = Lookups.Stages.getAllStagesWithStatuses(this.pipelineId)
//             .sort((a: PipelineStageModel, b: PipelineStageModel) => {
//                 return Number(a.statusId) - Number(b.statusId) || Number(a.stageId) - Number(b.stageId);
//             });
//     }

//     registerOnChange(fn: () => void) {
//         this.onChange = fn;
//     }

//     registerOnTouched(fn: () => void) {
//         this.onTouched = fn;
//     }

//     writeValue(value: Stage) {
//         if (value !== undefined) {
//             this.value = value;
//         }
//     }
// }