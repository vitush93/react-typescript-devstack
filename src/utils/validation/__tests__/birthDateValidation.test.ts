import { isAdult, isNotDead, isValidDate } from 'utils/validation/birthDateValidation';

jest.mock('i18next', () => ({
    t: (i: string) => i,
}));

it('Checking if date is valid', function() {
    expect(isValidDate('day', 'month', 'year')(null, { day: '1', month: '1', year: '2000' })).toBeNull();
    expect(isValidDate('day', 'month', 'year')(null, { year: '200' })).toBe(null);
    expect(isValidDate('day', 'month', 'year')(null, { day: '31', month: '2', year: '2000' })).toBeTruthy();
});

it('Checking if is birth date of adult', function() {
    expect(isAdult('day', 'month', 'year')(null, { day: '1', month: '1', year: '2000' })).toBeNull();
    expect(isAdult('day', 'month', 'year')(null, { year: '200' })).toBeNull();
    expect(isAdult('day', 'month', 'year')(null, { day: '31', month: '2', year: '2017' })).toBeTruthy();
});

it('Checking if is birth date less then 100 years ago', function() {
    expect(isNotDead('day', 'month', 'year')(null, { day: '1', month: '1', year: '1917' })).toBeTruthy();
    expect(isNotDead('day', 'month', 'year')(null, { year: '200' })).toBeNull();
    expect(isNotDead('day', 'month', 'year')(null, { day: '31', month: '2', year: '2017' })).toBeNull();
});
