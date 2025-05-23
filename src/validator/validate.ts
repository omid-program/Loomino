import validators from "./validators";
import regex from "./regex";

// ساختار هر آیتم از validations
interface ValidationItem {
   value: string;
   min?: number;
   max?: number;
}

// value می‌تونه رشته باشه و validations آرایه‌ای از ValidationItem هستن
const validator = (value: string, validations: ValidationItem[]): boolean => {
   let validationResult: boolean[] = [];

   for (const validatorItem of validations) {
      if (validatorItem.value === validators.REQUIRED_VALUE) {
         value.trim().length === 0 && validationResult.push(false);
      }

      if (validatorItem.value === validators.MIN_VALUE && typeof validatorItem.min === "number") {
         value.trim().length < validatorItem.min && validationResult.push(false);
      }

      if (validatorItem.value === validators.MAX_VALUE && typeof validatorItem.max === "number") {
         value.trim().length > validatorItem.max && validationResult.push(false);
      }

      if (validatorItem.value === validators.EMAIL_VALUE) {
         !regex.testEmail(value) && validationResult.push(false);
      }
   }

   return validationResult.length === 0;
};

export default validator;
