import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

// unlike pipeline-graphic, which is a meter that fills up,
// pipeline-view shows a set of booleans using the same segmented-meter graphic

@Component({
    selector: 'pipeline-view',
    templateUrl: './pipeline-view.component.html',
    styleUrls: ['./pipeline-view.component.css']
})
export class PipelineViewComponent implements OnInit {
    @Input() stages: any[];
    allStages = [];
    selectedNames: string;

    ngOnInit() {
        this.updateNames();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.stages && changes && changes.stages && changes.stages.previousValue !== changes.stages.currentValue) {
            this.updateNames();
        }
    }

    isSelected(stage) {
        return (this.stages.indexOf(stage) > -1);
    }

    private updateNames() {
        const list: string[] = [];
        if (this.stages.length === 0) {
            this.selectedNames = '';
            return;
        }
        const sortedstages = this.stages.sort();
        // for (let i = 0; i < sortedstages.length; i++) {
        //     if (Lookups.Stages.getLabel(this.stages[i]).length > 0) {
        //         list.push(Lookups.Stages.getLabel(this.stages[i]));
        //     }
        // }
        this.selectedNames = list.join(', ');
    }
}
