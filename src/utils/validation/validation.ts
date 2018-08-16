import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import { fillWithZerosFromLeft } from '../../utils/zeroFilledArray';

export function createValidator(rules: any) {
    return (data: any = {}, props: any) => {
        const errors: any = {};
        Object.keys(rules).forEach((key: any) => {
            const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
            const error = rule(data[key], data, props, key);
            if (error) {
                errors[key] = error;
            }
        });
        return errors;
    };
}

const join = (rules: any) => (value: any, data: any, props: any, name: any) =>
    rules.map((rule: any) => rule(value, data, props, name)).filter((error: any) => !!error)[0 /* first error */];

export const required = (value: any) => (value ? null : t('validation.required'));

export function email(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return t('formErrors.email');
    }
}

export const length = (expected: number) => (value: string) =>
    value && value.length === expected ? null : t('validation.wrongLength', { length: expected });

export const czechPrefix = (value: string) => {
    return isCzechPrefix(value) ? null : t('validation.phoneNumber.notCzechNumber');
};

export const isCzechPrefix = (value: string): boolean => {
    return value && parseInt(value) === 420;
};

export const czechPhoneNumberHasNineCharacters = (other: string) => (value: string, values: any) => {
    const prefix = values[other];
    return isCzechPrefix(prefix) && value && value.toString().length !== 9 ? t('validation.phoneNumber.mustHaveNineCharacters') : null;
};

const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
};

export const validateBirthNumber = (value: string): string => {
    if (!verifyBirthNumberLength(value)) {
        return t('validation.birthNumber.invalid');
    }
    const year_field: string = value.substr(0, 2);
    const month_field: string = value.substr(2, 2);
    const day_field: string = value.substr(4, 2);
    const prefix: string = value.substr(0, 6);
    const postfix: string = value.substr(6);
    if (!checkModulo(prefix, postfix)) {
        return t('validation.birthNumber.invalid');
    }

    //Posftix with length 3 is not used since 1955
    if (Number.parseInt(year_field) >= 54 && postfix.length !== 4) {
        return t('validation.birthNumber.invalid');
    }

    const month = getRealMonthFromBirthNumberMonthField(Number.parseInt(month_field));
    const year: number = getRealYearFromBirthNumberYearField(year_field, postfix);
    const day: number = Number.parseInt(day_field);

    if (!checkValidDate(year, month, day)) {
        return t('validation.birthNumber.invalid');
    }

    if (!checkAdulthood(year, month, day)) {
        return t('validation.birthNumber.tooYoung');
    }

    return null;
};

const getGenderFromMonth = (month_field_number: number): string => {
    return month_field_number > 50 ? GENDER.FEMALE : GENDER.MALE;
};

const getRealMonthFromBirthNumberMonthField = (month_field_number: number): number => {
    if (getGenderFromMonth(month_field_number) === GENDER.FEMALE) {
        if (month_field_number > 70) {
            return month_field_number - 70;
        } else {
            return month_field_number - 50;
        }
    } else {
        if (month_field_number > 20) {
            return month_field_number - 20;
        } else {
            return month_field_number;
        }
    }
};

const getRealYearFromBirthNumberYearField = (year_field: string, postfix: string): number => {
    const year_field_number: number = Number.parseInt(year_field);
    if (postfix.length === 4 && year_field_number < 54) {
        return year_field_number + 2000;
    } else {
        return year_field_number + 1900;
    }
};

const checkModulo = (prefix: string, postfix: string): boolean => {
    if (postfix.length === 3) {
        return true;
    }
    const wholeNumber = Number.parseInt(prefix + postfix);
    const modulo = wholeNumber % 11;
    if (modulo !== 0) {
        if (postfix.charAt(3) === '0') {
            const check2: number = Number.parseInt(prefix + postfix.substr(0, 3));
            const modulo2: number = check2 % 11;
            if (modulo2 !== 10) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
};

export const checkValidDate = (year: number, month: number, day: number): boolean => {
    const dateToCheck: Date = new Date();
    dateToCheck.setFullYear(year, month - 1, day);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck.getFullYear() === year && dateToCheck.getMonth() === month - 1 && dateToCheck.getDate() === day;
};

export const checkAdulthood = (year: number, month: number, day: number): boolean => {
    const becomesAdult: Date = new Date();
    becomesAdult.setFullYear(year + 18, month - 1, day);
    becomesAdult.setHours(0, 0, 0, 0);
    const currentDate: number = Date.now();
    return currentDate >= becomesAdult.getTime();
};

const verifyBirthNumberLength = (value: string): boolean => numberBetween(value, 9, 10);

const numberBetween = (value: string, min: number, max: number): boolean => {
    return value !== undefined && value.length >= min && value.length <= max;
};

export const hasToBeValidBankNumberWithPrefix = (prefixFieldName: string) => (value: string, values: { [key: string]: string }): string => {
    const prefixWeights = [10, 5, 8, 4, 2, 1];
    const accountNumberWeights = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

    const prefix = values[prefixFieldName];
    const accountNumber = value;

    const prefixArray: number[] = map(prefix, (number: string) => Number(number));
    const accountNumberArray: number[] = map(accountNumber, (number: string) => Number(number));

    const prefixZeroArray: number[] = fillWithZerosFromLeft(prefixArray, prefixWeights.length);
    const accountNumberZeroArray: number[] = fillWithZerosFromLeft(accountNumberArray, accountNumberWeights.length);

    const prefixWeightedArray: number[] = prefixZeroArray.map((number: number, index: number) => number * prefixWeights[index]);
    const accountNumberWeightedArray: number[] = accountNumberZeroArray.map(
        (number: number, index: number) => number * accountNumberWeights[index],
    );

    const reducedPrefix: number = prefixWeightedArray.reduce((a: number, b: number) => a + b, 0);
    const reducedAccountNumber: number = accountNumberWeightedArray.reduce((a: number, b: number) => a + b, 0);

    const sumarization: number = reducedPrefix + reducedAccountNumber;

    if (sumarization % 11 === 0) {
        return null;
    } else {
        return t('validation.bankAccount');
    }
};
