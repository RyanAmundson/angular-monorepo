/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from "@angular/forms";

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
        CommonModule,
        FormsModule
    ]
})
export class DateSelectorComponent implements ControlValueAccessor {
    private _date: unknown;
    @Input() required!: boolean;
    @Input() minDate!: unknown;
    @Input() maxDate!: unknown;

    onChange = () => { };
    onTouched = () => { };  

    get value() {
        return this._date;
    }

    set value(date: unknown) {
        this._date = date;
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: unknown) {
        if (value !== undefined) {
            this.value = value;
        }
    }
}