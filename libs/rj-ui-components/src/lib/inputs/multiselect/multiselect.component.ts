/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ListItem, MyException } from './multiselect.model';
import { MultiselectDropdownSettings } from './multiselect.interface';

export { MultiselectDropdownSettings } from './multiselect.interface';

export const DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 'rjui-multiselect',
    templateUrl: './multiselect.component.html',
    host: { '[class]': 'defaultSettings.classes' },
    styleUrls: ['./multiselect.component.scss'],
    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
    @Input() data: Array<ListItem> = new Array<ListItem>();
    @Input() settings!: MultiselectDropdownSettings;
    @Input() labelKey = "itemName";
    @Input() valueKey = "id";
    @Output() selected: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output() deselected: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output() allSelected: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();
    @Output() allDeselected: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();

    selectedItems: Array<ListItem> = new Array<ListItem>();
    isActive = false;
    isSelectAll = false;
    filter: ListItem = new ListItem();
    defaultSettings: MultiselectDropdownSettings = {
        singleSelection: false,
        placeholder: 'Select...',
        enableCheckAll: true,
        selectAllText: 'Select All',
        unSelectAllText: 'Unselect All',
        enableSearchFilter: false,
        maxHeight: 300,
        badgeShowLimit: 999999999999,
        classes: '',
        disabled: false,
        searchPlaceholderText: 'Search'
    }

    ngOnInit() {
        this.settings = Object.assign({}, this.defaultSettings, this.settings);
        if (this.labelKey === undefined)
            console.error("multiselect labelKey is set incorrectly. Use labelKey='nameofProperty' without [] or {{}}");
        if (this.valueKey === undefined)
            console.error("multiselect valueKey is set incorrectly. Use valueKey='nameofProperty' without [] or {{}}");
        if (this.data && this.data.length && (this.data[0][this.labelKey as keyof ListItem] === undefined || this.data[0][this.labelKey as keyof ListItem] === null))
            console.error("multiselect is using property", this.labelKey, "as the display property, but that property is blank on first data item:", this.data[0]);
        if (this.data && this.data.length && (this.data[0][this.valueKey as keyof ListItem] === undefined || this.data[0][this.valueKey as keyof ListItem] === null))
            console.error("multiselect is using property", this.valueKey, "as the value property, but that property is blank on first data item:", this.data[0]);
        if (!this.data || !this.data.length)
            console.error("multiselect was passed no data");
    }
    ngDoCheck() {
        if (this.selectedItems) {
            if (this.selectedItems.length == 0 || this.data.length == 0 || this.selectedItems.length < this.data.length) {
                this.isSelectAll = false;
            }
        }
    }
    onItemClick(item: ListItem): boolean {
        if (this.settings.disabled) {
            return false;
        }

        let found = this.isSelected(item);
        const limit = this.settings.limitSelection !== undefined && (this.selectedItems.length < Number(this.settings.limitSelection));

        if (!found) {
            if (this.settings.limitSelection) {
                if (limit) {
                    this.addSelected(item);
                    this.selected.emit(item);
                }
            }
            else {
                this.addSelected(item);
                this.selected.emit(item);
            }

        }
        else {
            this.removeSelected(item);
            this.deselected.emit(item);
        }
        if (this.isSelectAll || this.data.length > this.selectedItems.length) {
            this.isSelectAll = false;
        }
        if (this.data.length == this.selectedItems.length) {
            this.isSelectAll = true;
        }
        return false;
    }
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: unknown) => void = noop;

    writeValue(value: unknown) {
        if (value !== undefined && value !== null) {
            if (this.settings.singleSelection) {
                try {

                    if (value.length > 1) {
                        this.selectedItems = [value[0]];
                        throw new MyException(404, { "msg": "Single Selection Mode, Selected Items cannot have more than one item." });
                    }
                    else {
                        this.selectedItems = value;
                    }
                }
                catch (e) {
                    console.error(e.body.msg);
                }

            }
            else {
                if (this.settings.limitSelection) {
                    this.selectedItems = value.splice(0, this.settings.limitSelection);
                }
                else {
                    this.selectedItems = [...value];
                }
                if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                    this.isSelectAll = true;
                }
            }
        } else {
            this.selectedItems = [];
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    trackByFn(index: number, item: ListItem): string | Number | null {
        if (item[this.valueKey])
            return item[this.valueKey];
        return null;
    }
    isSelected(clickedItem: ListItem) {
        let found = false;
        this.selectedItems && this.selectedItems.forEach(item => {
            if (clickedItem[this.valueKey] === item[this.valueKey]) {
                found = true;
            }
        });
        return found;
    }
    addSelected(item: ListItem) {
        if (this.settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else
            this.selectedItems.push(item);
        this.onChangeCallback(this.selectedItems);
    }
    removeSelected(clickedItem: ListItem) {
        if (!this.selectedItems) return;
        const index = this.selectedItems.findIndex(item => 
            item[this.valueKey as keyof ListItem] === clickedItem[this.valueKey as keyof ListItem]
        );
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
        this.onChangeCallback(this.selectedItems);
    }
    toggleDropdown(evt: any) {
        if (this.settings.disabled) {
            return;
        }
        this.isActive = !this.isActive;
        evt.preventDefault();
    }
    closeDropdown() {
        this.isActive = false;
    }
    toggleSelectAll() {
        if (!this.isSelectAll) {
            this.selectedItems = [];
            this.selectedItems = this.data.slice();
            this.isSelectAll = true;
            this.onChangeCallback(this.selectedItems);
            this.allSelected.emit(this.selectedItems);
        }
        else {
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.allDeselected.emit(this.selectedItems);
        }
    }
}
