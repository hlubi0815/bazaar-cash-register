import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {ReceiptItem} from "./receipt-item.model";
import {ReceiptService} from "./receipt.service";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {DataService} from "./data.service";
import {CustomValidators} from "../CustomValidators";
import {ProviderService} from "../provider/provider.service";

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
    console.log("Edit: " + this.isEdit);
    const newReceiptItem = new ReceiptItem(this.myForm.value.listnumber, this.myForm.value.itemAmount);
    newReceiptItem.itemnumber = this.myForm.value.itemnumber;
    if (this.isEdit) {
      // Bearbeiten
      this.rs.editItem(this.selectedReceiptItem, newReceiptItem);
      this.isEdit = false;
    } else {
      // Neu
      this.rs.addItem(newReceiptItem);
    }
    this.onClear();
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
      'listnumber': new FormControl('', [Validators.required, CustomValidators.listnumber, this.listnumberExist.bind(this)]),
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
      if (this.ps.providers[i].listnumber == numValue) {
        return true;
      }
    }
    return false;
  }

}
