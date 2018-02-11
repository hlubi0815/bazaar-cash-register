import {FormControl, ValidationErrors} from '@angular/forms';



export class ReceiptValidators {

  static listnumber(c: FormControl): ValidationErrors {
    if (c.value === null) {
      return null;
    }

    const numValue = Number(c.value);
    const isValid = !isNaN(numValue) && numValue >= 200 && numValue <= 299;
    const message = {
      'listnumber': {
        'message': 'Die Listenummer muss zwischen 240 und 299 liegen und darf noch nicht vergeben sein'
      }
    };
    return isValid ? null : message;
  }


}

