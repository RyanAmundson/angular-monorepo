// import { Component, forwardRef, OnInit, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import IKeyValuePair = app.common.interfaces.IKeyValuePair;
// import PhoneType = app.common.constants.PhoneType;

// @Component({
//     selector: 'phone-type-selector',
//     templateUrl: './phone-type-selector.component.html',
//     providers: [
//         {
//             provide: NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => PhoneTypeSelectorComponent),
//             multi: true
//         }
//     ]
// })
// export class PhoneTypeSelectorComponent implements OnInit, ControlValueAccessor {
//     private _phoneType: PhoneType;
//     @Input() cssClass: string;

//     phoneTypes: IKeyValuePair<string, PhoneType>[];
//     onChange = () => { };
//     onTouched = () => { };

//     get value(): PhoneType {
//         return this._phoneType;
//     }

//     set value(phoneType: PhoneType) {
//         this._phoneType = phoneType;
//     }

//     ngOnInit() {
//         this.phoneTypes = app.common.lookups.PhoneTypes.getList();
//     }

//     registerOnChange(fn: ()=>void) {
//         this.onChange = fn;
//     }

//     registerOnTouched(fn: ()=>void) {
//         this.onTouched = fn;
//     }

//     writeValue(value: PhoneType) {
//         this.value = value === null ? undefined : value;
//     }
// }