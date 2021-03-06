import {FormControl, ValidationErrors} from '@angular/forms';
import {BazaarService} from "./_services/bazaar.service";


export class CustomValidators {

  static listnumber(c: FormControl): ValidationErrors {
    const numValue = Number(c.value);
    const isValid = !isNaN(numValue) && numValue >= 240 && numValue <= 299;
    const message = {
      'listnumber': {
        'message': 'Die Listenummer muss zwischen 240 und 299 liegen und darf noch nicht vergeben sein'
      }
    };
    return isValid ? null : message;
  }


}

