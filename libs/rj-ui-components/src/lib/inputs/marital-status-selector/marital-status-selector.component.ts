// import { Component, forwardRef, OnInit, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import IKeyValuePair = app.common.interfaces.IKeyValuePair;
// import { MaritalStatus, MaritalStatusLookupService } from "../../common/services/marital-status";
// import { LookupListItem } from '../../common/services/lookup-list';

// @Component({
//     selector: 'marital-status-selector',
//     templateUrl: './marital-status-selector.component.html',
//     providers: [
//         {
//             provide: NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => MaritalStatusSelectorComponent),
//             multi: true
//         }
//     ]
// })
// export class MaritalStatusSelectorComponent implements OnInit, ControlValueAccessor {
//     private _maritalStatusId: MaritalStatus | '';
//     @Input() cssClass: string;

//     maritalStatuses: LookupListItem<MaritalStatus>[];
//     onChange = () => { };
//     onTouched = () => { };

//     get value(): MaritalStatus | '' {
//         return this._maritalStatusId;
//     }

//     set value(maritalStatusId: MaritalStatus | '') {
//         this._maritalStatusId = maritalStatusId;
//     }

//     constructor(private lookupService: MaritalStatusLookupService) {
//     }

//     ngOnInit() {
//         this.maritalStatuses = this.lookupService.getList();
//     }

//     registerOnChange(fn: () => void) {
//         this.onChange = fn;
//     }

//     registerOnTouched(fn: () => void) {
//         this.onTouched = fn;
//     }

//     writeValue(value: MaritalStatus | '') {
//         this.value = value === null ? '' : value;
//     }
// }