import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { addDays } from "./date-calculations";

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const dateValue = new Date(control.value);
    //dateValue.setHours(0, 0, 0, 0);
    const minDate = new Date();
    //minDate.setHours(0, 0, 0, 0); 
    console.log(dateValue,minDate)
    const maxDate = addDays(minDate, 7);

    if (dateValue < minDate || dateValue > maxDate) {
      return { dateOutOfRange: { message: 'Date cannot be before today or more than 7 days from now' } };
    }

    return null;
  };
}
