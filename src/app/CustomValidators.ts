import {FormControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  static listnumber(c: FormControl): ValidationErrors {
    const numValue = Number(c.value);
    const isValid = !isNaN(numValue) && numValue >= 200 && numValue <= 320;
    const message = {
      'listnumber': {
        'message': 'Die Listenummer muss zwischen 200 und 320 liegen und darf noch nicht vergeben sein'
      }
    };
    return isValid ? null : message;
  }


}

