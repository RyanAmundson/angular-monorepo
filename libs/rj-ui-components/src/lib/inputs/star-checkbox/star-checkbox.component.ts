/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component, forwardRef, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, forwardRef, Input } from "@angular/core";

@Component({
    selector: 'rjui-star-checkbox',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './star-checkbox.component.html',
    styleUrls: ['./star-checkbox.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarCheckboxComponent),
            multi: true
        }
    ]
})
export class StarCheckboxComponent implements ControlValueAccessor {
    private _value = false;
    @Input() cssId = '';
    @Input() cssClass = '';

    onChange = () => { };
    onTouched = () => { };

    get value(): boolean {
        return this._value;
    }
    set value(value: boolean) {
        this._value = value;
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: boolean) {
        this.value = value;
    }
}