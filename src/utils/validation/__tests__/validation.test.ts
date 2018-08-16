import { hasToBeValidBankNumberWithPrefix, validateBirthNumber } from 'utils/validation/validation';

jest.mock('i18next', () => ({
    t: (i: string) => i,
}));

test('BirthNumber has 9 to 10 digits', function() {
    expect(validateBirthNumber('8505260896')).toBe(null);
    expect(validateBirthNumber('250526089')).toBe(null);
    expect(validateBirthNumber('8505260')).toBeDefined();
    expect(validateBirthNumber('850526089656')).toBeDefined();
    expect(validateBirthNumber(undefined)).toBeDefined();
});

test('BirthNumber modulo test', function() {
    expect(validateBirthNumber('8505260896')).toBe(null);
    expect(validateBirthNumber('8505260895')).toBeDefined();
    expect(validateBirthNumber('8505260894')).toBeDefined();
});

test('BirthNumber modulo exception', function() {
    expect(validateBirthNumber('8505260930')).toBe(null);
    expect(validateBirthNumber('8505260931')).toBeDefined();
});

test('BirthNumber - Test adulthood', function() {
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1532694332427); //2018/27/07/14:25 CET
    global.Date.now = dateNowStub;
    expect(validateBirthNumber(addValidPostfix('800101'))).toBe(null);
    expect(validateBirthNumber(addValidPostfix('000727'))).toBe(null);
    expect(validateBirthNumber(addValidPostfix('000728'))).toBe('validation.birthNumber.tooYoung');
    expect(validateBirthNumber(addValidPostfix('010101'))).toBe('validation.birthNumber.tooYoung');
    global.Date.now = realDateNow;
});

test('Check 9 digits birth number', function() {
    expect(validateBirthNumber('123123123')).toBe(null);
});

test('Test reported problems', function() {
    expect(validateBirthNumber('8301303252')).toBe(null);
});

const addValidPostfix = (prefix: string): string => {
    for (let i: number = 0; i <= 11; i++) {
        const generated = prefix + (i < 10 ? '000' : '00') + i.toString();
        if (Number.parseInt(generated) % 11 === 0) {
            return generated;
        }
    }
    console.log('Valid number not found. Returning invalid');
    return prefix + '0000';
};

test('Test bank account number', function() {
    expect(hasToBeValidBankNumberWithPrefix('bankAccountPrefix')('1234561231', { bankAccountPrefix: '123412' })).toBe(
        'validation.bankAccount',
    );
    expect(hasToBeValidBankNumberWithPrefix('bankAccountPrefix')('1234561231', { bankAccountPrefix: '' })).toBe('validation.bankAccount');
    expect(hasToBeValidBankNumberWithPrefix('bankAccountPrefix')('5072438389', { bankAccountPrefix: '' })).toBe(null);
    expect(hasToBeValidBankNumberWithPrefix('bankAccountPrefix')('77620021', { bankAccountPrefix: '7747' })).toBe(null);
});
