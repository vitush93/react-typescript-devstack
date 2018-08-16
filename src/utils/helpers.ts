export const numberWithSpaces = (x: number | string) => {
    if (x) {
        return x
            .toString()
            .replace(/\s/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(160));
    }

    return null;
};

export const normalizeNumber = (value: string, previousValue: string, maxVal?: number, maxLength?: number): string => {
    if (!value || value.length <= 0) {
        return value;
    }
    const numericValue = value.replace(/\D/g, '');
    const intValue = parseInt(numericValue);
    if ((maxVal && intValue > maxVal) || (maxLength && numericValue.length > maxLength)) {
        return previousValue;
    }
    return numericValue;
};
