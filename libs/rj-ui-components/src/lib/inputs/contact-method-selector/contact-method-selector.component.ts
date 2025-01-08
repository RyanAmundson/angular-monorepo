/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'rjui-contact-method-selector',
    standalone: true,
    templateUrl: './contact-method-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ContactMethodSelectorComponent),
            multi: true
        }
    ],
    imports: [
        // Add necessary imports here
    ]
})
export class ContactMethodSelectorComponent implements ControlValueAccessor {
    private _contactMethod: unknown | '';
    @Input() cssClass = '';

    contactMethods: unknown[] = [];
    onChange = () => { };
    onTouched = () => { };

    get value(): unknown | '' {
        return this._contactMethod;
    }

    set value(contactMethod: unknown | '') {
        this._contactMethod = contactMethod;
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: unknown | '') {
        this.value = value === null ? '' : value;
    }
}