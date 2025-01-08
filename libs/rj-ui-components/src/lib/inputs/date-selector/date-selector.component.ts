import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'rjui-date-selector',
    templateUrl: './date-selector.component.html',
    styleUrls:[
        './date-selector.component.css'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateSelectorComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [
        // Add necessary imports here
    ]
})
export class DateSelectorComponent implements ControlValueAccessor {
    private _date: NgbDateStruct;
    @Input() required: boolean;
    @Input() minDate: NgbDateStruct;
    @Input() maxDate: NgbDateStruct;

    onChange = () => { };
    onTouched = () => { };

    get value(): NgbDateStruct {
        return this._date;
    }

    set value(date: NgbDateStruct) {
        this._date = date;
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: NgbDateStruct) {
        if (value !== undefined) {
            this.value = value;
        }
    }
}