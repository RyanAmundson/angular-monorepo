import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'rjui-gender-selector',
    templateUrl: './gender-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GenderSelectorComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [
        // Add necessary imports here
    ]
})
export class GenderSelectorComponent implements OnInit, ControlValueAccessor {
    private _gender: any | '';
    @Input() cssClass: string = '';

    genderOptions: any[] = [];
    onChange = () => { };
    onTouched = () => { };

    get value(): any | '' {
        return this._gender;
    }

    set value(gender: any | '') {
        this._gender = gender;
    }

    ngOnInit() {
        // Initialize genderOptions here
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: any | '') {
        this.value = value === null ? '' : value;
    }
}