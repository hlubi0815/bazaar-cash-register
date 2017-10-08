import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {Provider} from "./provider.model";

import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProviderService} from "./provider.service";
import {CustomValidators} from "../CustomValidators";


@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styles: []
})
export class ProviderAddComponent implements OnInit, OnChanges {

  providerForm: FormGroup;
  selectedProvider: Provider;
  @Output() cleared = new EventEmitter();
  isEdit = false;


  constructor(private ps: ProviderService) {
  }

  public focusNewEntry = new EventEmitter<boolean>();

  onSubmit() {
    console.log("OnSubmit");
    console.log("Edit: " + this.isEdit);
    const newProvider = new Provider(this.providerForm.value.bazaarid, this.providerForm.value.listnumber,
      this.providerForm.value.firstname, this.providerForm.value.lastname, this.providerForm.value.phonenumber,
      this.providerForm.value.email, this.providerForm.value.supporter);

    if (this.isEdit) {
      // Bearbeiten
      this.ps.editItem(this.selectedProvider, newProvider);
      this.isEdit = false;
    } else {
      // Neu
      this.ps.addItem(newProvider);
    }
    this.onClear();

  }

  onClear() {
    this.providerForm.reset();
    this.focusNewEntry.emit(true);
    this.cleared.emit();
  }

  /*   onReset() {
       this.rs.deleteAllItems();
       this.isEdit = false;
     }
   */
  onDelete() {
    this.ps.deleteItem(this.selectedProvider);
    this.onClear();
    this.isEdit = false;
  }

  ngOnChanges(changes) {
    console.log(changes);
  }


  ngOnInit() {

    this.providerForm = new FormGroup({
      'listnumber': new FormControl('', [Validators.required, CustomValidators.listnumber, this.listnumberExist.bind(this)]),
      'firstname': new FormControl(null),
      'lastname': new FormControl(null),
      'phonenumber': new FormControl(null),
      'email': new FormControl(null),
      'supporter': new FormControl(null),
    });

    this.ps.pushedSelectedProvider.subscribe(
      (data: Provider) => {
        console.log("Item selected" + data);
        this.selectedProvider = data;
        this.providerForm.setValue({
          'listnumber': data.listnumber,
          'firstname': data.firstname,
          'lastname': data.lastname,
          'phonenumber': data.phonenumber,
          'email': data.email,
          'supporter': data.supporter
        });
        this.isEdit = true;
      }
    );

    this.ps.nextFreelistnumberEvent.subscribe(
      (data: number) => {
        this.providerForm.patchValue({'listnumber': data});
      }
    );


  }

  listnumberExist(c: FormControl): ValidationErrors {
    const numValue = Number(c.value);
    const isValid = !this.findInProviders(numValue);
    const message = {
      'listnumber': {
        'message': 'Die Listenummer existiert bereits'
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
