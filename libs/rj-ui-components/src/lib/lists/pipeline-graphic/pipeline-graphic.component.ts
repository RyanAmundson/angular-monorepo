import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pipeline-graphic',
  templateUrl: "./pipeline-graphic.component.html",
  styleUrls: ["./pipeline-graphic.component.css"]
})
export class PipelineGraphicComponent implements OnInit {
  @Input() pipelineStageId: string;
  label = "";
  stages: any[];

  ngOnInit() {
    this.stages = [{}, {}, {}];
  }

  ngOnChanges() {
    this.label = "test";
  }

  isStageEqualOrBefore(pipelineStageId): boolean {
    return pipelineStageId <= this.pipelineStageId;
  }

}
