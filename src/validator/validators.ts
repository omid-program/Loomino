// validators.ts

export const REQUIRED_VALUE = 'REQUIRED_VALUE' as const;
export const MIN_VALUE = 'MIN_VALUE' as const;
export const MAX_VALUE = 'MAX_VALUE' as const;
export const EMAIL_VALUE = 'EMAIL_VALUE' as const;

export interface RequiredValidator {
   value: typeof REQUIRED_VALUE;
}

export interface EmailValidator {
   value: typeof EMAIL_VALUE;
}

export interface MinValidator {
   value: typeof MIN_VALUE;
   min: number;
}

export interface MaxValidator {
   value: typeof MAX_VALUE;
   max: number;
}

export type Validator = RequiredValidator | EmailValidator | MinValidator | MaxValidator;

export const requiredValidator = (): RequiredValidator => ({
   value: REQUIRED_VALUE,
});

export const emailValidator = (): EmailValidator => ({
   value: EMAIL_VALUE,
});

export const minValidator = (min: number): MinValidator => ({
   value: MIN_VALUE,
   min,
});

export const maxValidator = (max: number): MaxValidator => ({
   value: MAX_VALUE,
   max,
});

export default {
   REQUIRED_VALUE,
   MIN_VALUE,
   MAX_VALUE,
   EMAIL_VALUE,
};
