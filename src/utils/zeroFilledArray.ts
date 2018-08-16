export function createZeroFilledArray(length: number): number[] {
    const array = [];
    for (let index = 0; index < length; index++) {
        array.push(0);
    }
    return array;
}

export function fillWithZerosFromLeft(originalArray: number[], finalLength: number): number[] {
    const zeroArray = createZeroFilledArray(finalLength - originalArray.length);
    return zeroArray.concat(originalArray);
}
