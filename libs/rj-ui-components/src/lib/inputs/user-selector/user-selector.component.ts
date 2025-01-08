/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'rjui-user-selector',
    templateUrl: './user-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserSelectorComponent),
            multi: true
        }
    ],
    imports: [CommonModule, FormsModule],
    standalone: true,
})
export class UserSelectorComponent implements ControlValueAccessor {

    onChange = () => { };
    onTouched = () => { };

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue() {
    }
}