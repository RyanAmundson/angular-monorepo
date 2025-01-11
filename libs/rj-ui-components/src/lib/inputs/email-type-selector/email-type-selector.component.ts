/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'rjui-email-type-selector',
    templateUrl: './email-type-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailTypeSelectorComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class EmailTypeSelectorComponent implements OnInit, ControlValueAccessor {
    private _emailType: unknown;
    @Input() cssClass: string = '';

    emailTypes: unknown[] = [];
    onChange = () => { };
    onTouched = () => { };

    get value(): unknown {
        return this._emailType;
    }

    set value(emailType: unknown) {
        this._emailType = emailType;
    }

    ngOnInit() {
        this.emailTypes = [];
    }

    registerOnChange(fn: () => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    writeValue(value: unknown) {
        this.value = value === null ? undefined : value;
    }
}