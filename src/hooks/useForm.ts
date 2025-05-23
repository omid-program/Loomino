import { useCallback, useReducer } from "react";

// نوع داده‌ی هر ورودی فرم (مثل name، email و ...)
interface InputState {
   value: any;
   isValid: boolean;
}

// همه‌ی ورودی‌ها: key به دلخواه (مثلاً "email"، "name"، ...) و مقدار از نوع InputState
type Inputs = {
   [key: string]: InputState;
};

// وضعیت کلی فرم
interface FormState {
   inputs: Inputs;
   isFormValid: boolean;
}

// نوع اکشن‌ها برای reducer
type FormAction = {
   type: 'INPUT_CHANGE';
   inputId: string;
   value: any;
   isValid: boolean;
};

const formReducer = (state: FormState, action: FormAction): FormState => {
   switch (action.type) {
      case 'INPUT_CHANGE': {
         let isFormValid = true;
         for (const inputId in state.inputs) {
            if (inputId === action.inputId) {
               isFormValid = isFormValid && action.isValid;
            } else {
               isFormValid = isFormValid && state.inputs[inputId].isValid;
            }
         }
         return {
            ...state,
            inputs: {
               ...state.inputs,
               [action.inputId]: {
                  value: action.value,
                  isValid: action.isValid,
               },
            },
            isFormValid,
         };
      }
      default:
         return state;
   }
};

export const useForm = (
   initInputs: Inputs,
   initFormIsValid: boolean
): [FormState, (id: string, value: any, isValid: boolean) => void] => {
   const [formState, dispatch] = useReducer(formReducer, {
      inputs: initInputs,
      isFormValid: initFormIsValid,
   });

   const onInputHandeler = useCallback(
      (id: string, value: any, isValid: boolean) => {
         dispatch({
            type: 'INPUT_CHANGE',
            value,
            isValid,
            inputId: id,
         });
      },
      []
   );

   return [formState, onInputHandeler];
};
