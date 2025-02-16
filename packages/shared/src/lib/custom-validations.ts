import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { addDays } from "./date-calculations";

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const minDate = new Date();
    const maxDate = addDays(minDate, 7);
    const dateValue = control.value;
    const today = new Date(dateValue).getDate();

    if (dateValue < minDate || dateValue > maxDate ) {
      return { dateOutOfRange: {message : "Date cannot be more than 7 days from now"} };
    }
    return null;
  };
}
