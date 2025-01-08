import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        // Add necessary imports here
    ]
})
export class EmailTypeSelectorComponent implements OnInit, ControlValueAccessor {
    private _emailType: any;
    @Input() cssClass: string = '';

    emailTypes: IKeyValuePair<string, EmailType>[];
    onChange = () => { };
    onTouched = () => { };

    get value(): EmailType {
        return this._emailType;
    }

    set value(emailType: EmailType) {
        this._emailType = emailType;
    }

    ngOnInit() {
        this.emailTypes = app.common.lookups.EmailTypes.getList();
    }

    registerOnChange(fn: ()=>void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: ()=>void) {
        this.onTouched = fn;
    }

    writeValue(value: EmailType) {
        this.value = value === null ? undefined : value;
    }
}