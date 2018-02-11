import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {ReceiptItem} from "../_models/receipt-item.model";
import {ReceiptService} from "../_services/receipt.service";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {DataService} from "../_services/data.service";
import {ProviderService} from "../_services/provider.service";
import {ReceiptValidators} from "./ReceiptValidators";
import {isUndefined} from "util";

@Component({
  selector: 'app-receipt-add-item',
  templateUrl: './receipt-add-item.component.html',
  styles: []
})
export class ReceiptAddItemComponent implements OnInit, OnChanges {
  myForm: FormGroup;
  selectedReceiptItem: ReceiptItem;
  @Output() cleared = new EventEmitter();
  isEdit = false;


  constructor(private rs: ReceiptService, private ds: DataService, private ps: ProviderService) {
  }

  public focusNewEntry = new EventEmitter<boolean>();

  onSubmit() {
    console.log("OnSubmit");
    if ( this.myForm.controls.listnumber.pristine === true) {
      this.myForm.controls.listnumber.setErrors({'listnumber': {
        'message': 'Die Listenummer existiert nicht !'
      }});
    } else {
      console.log("Edit: " + this.isEdit);
      const newReceiptItem = new ReceiptItem(this.myForm.value.listnumber, this.myForm.value.itemAmount);
      newReceiptItem.itemnumber = this.myForm.value.itemnumber;

      if (this.isEdit) {
        // Bearbeiten
        newReceiptItem.id = this.selectedReceiptItem.id;
        this.rs.editItem(this.selectedReceiptItem, newReceiptItem);
        this.isEdit = false;
      } else {
        // Neu
        this.rs.addItem(newReceiptItem);
      }
      this.onClear();
    }
  }

  onClear() {
    this.myForm.reset();
    this.focusNewEntry.emit(true);
    this.cleared.emit();
  }

  onReset() {
    this.rs.deleteAllItems();
    this.isEdit = false;
  }

  onDelete() {
    this.rs.deleteItem(this.selectedReceiptItem);
    this.onClear();
    this.isEdit = false;
  }

  ngOnChanges(changes) {
    console.log(changes);
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      'listnumber': new FormControl(null, [ReceiptValidators.listnumber, this.listnumberExist.bind(this)]),
      'itemnumber': new FormControl(null),
      'itemAmount': new FormControl(null),
    });

    this.ds.pushedSelectedItem.subscribe(
      (data: ReceiptItem) => {
        console.log("Item selected" + data);
        this.selectedReceiptItem = data;
        this.myForm.setValue({'listnumber': data.listnumber, 'itemnumber': data.itemnumber, 'itemAmount': data.amount});
        this.isEdit = true;
      }
    );


  }

  listnumberExist(c: FormControl): ValidationErrors {
    if (c.value === null) {
      return null;
    }

    const numValue = Number(c.value);
    const isValid = this.findInProviders(numValue);
    const message = {
      'listnumber': {
        'message': 'Die Listenummer existiert nicht !'
      }
    };
    return isValid ? null : message;
  }

  findInProviders(numValue: number) {
    for (let i = 0; i < this.ps.providers.length; i++) {
      if (this.ps.providers[i].listnumber === numValue) {
        return true;
      }
    }
    return false;
  }

}
