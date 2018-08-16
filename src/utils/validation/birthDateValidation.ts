import { t } from 'i18next';

interface DateStrings {
    dayString: string;
    monthString: string;
    yearString: string;
}

const getDateStrings = (dayField: string, monthField: string, yearField: string, allValues: any): DateStrings => {
    return {
        dayString: allValues[dayField],
        monthString: allValues[monthField],
        yearString: allValues[yearField],
    };
};

const getDateFromDateStrings = ({ dayString, monthString, yearString }: DateStrings) => {
    if (!dayString || !monthString || !yearString || yearString.length < 4) {
        return null;
    }

    const day = parseInt(dayString);
    const month = parseInt(monthString) - 1;
    const year = parseInt(yearString);

    const date: Date = new Date(year, month, day);

    return date;
};

export const isValidDate = (dayField: string, monthField: string, yearField: string) => (value: any, allValues: any) => {
    const { dayString, monthString, yearString } = getDateStrings(dayField, monthField, yearField, allValues);
    if (!dayString || !monthString || !yearString || yearString.length < 4) {
        return null;
    }

    const day = parseInt(dayString);
    const month = parseInt(monthString) - 1;
    const year = parseInt(yearString);

    const date: Date = getDateFromDateStrings({ dayString, monthString, yearString });
    if (!date) {
        return null;
    }

    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        return t('validation.birthDate.invalidDate');
    }

    return null;
};

export const isAdult = (dayField: string, monthField: string, yearField: string) => (value: any, allValues: any) => {
    const dateStrings = getDateStrings(dayField, monthField, yearField, allValues);
    const date = getDateFromDateStrings(dateStrings);

    if (!date) {
        return null;
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (date > maxDate) {
        return t('validation.birthDate.tooYoung');
    }
    return null;
};

export const isNotDead = (dayField: string, monthField: string, yearField: string) => (value: any, allValues: any) => {
    const dateStrings = getDateStrings(dayField, monthField, yearField, allValues);
    const date = getDateFromDateStrings(dateStrings);

    if (!date) {
        return null;
    }

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    if (date < minDate) {
        return t('validation.birthDate.invalidDate');
    }
    return null;
};
