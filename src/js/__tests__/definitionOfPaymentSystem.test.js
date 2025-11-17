import { test, describe, expect } from '@jest/globals';
import definitionOfPaymentSystem from '../../components/card-validator-widget/definitionOfPaymentSystem';

const mir = 'mir';
const visa = 'visa';
const mastercard = 'mastercard';
const americanExpress = 'american-express';
const discover = 'discover';
const jcb = 'jcb';
const dinersClub = 'diners-club';

describe('Testing the `definitionOfPaymentSystem()` function', () => {
  const errorMessage = 'The `cardNumber` parameter must be a string containing the card number';
  test.each([
    { notCardNumber: '', errorMessage }, { notCardNumber: 100, errorMessage },
    { notCardNumber: null, errorMessage }, { notCardNumber: 'qwerty123!@#]', errorMessage },
  ])('definitionOfPaymentSystem($notCard) — an error should be thrown', ({ notCardNumber, errorMessage }) => {
    expect(() => definitionOfPaymentSystem(notCardNumber)).toThrow(errorMessage);
  });

  test.each([
    { cardNumber: '0604651467779849', expected: 'unknown' },

    { cardNumber: '2200990572429475555', expected: mir },
    { cardNumber: '2200743205284812', expected: mir },
    { cardNumber: '2201013729000543', expected: mir },
    { cardNumber: '2202539631353066', expected: mir },
    { cardNumber: '2203023811716805', expected: mir },
    { cardNumber: '2204689454283243', expected: mir },

    { cardNumber: '4130137008588', expected: visa },
    { cardNumber: '4485827527222113', expected: visa },
    { cardNumber: '4556782887816113402', expected: visa },

    { cardNumber: '5519663850859842', expected: mastercard },
    { cardNumber: '2221001183848925', expected: mastercard },
    { cardNumber: '2720997042058703', expected: mastercard },

    { cardNumber: '379279782272077', expected: americanExpress },
    { cardNumber: '378493466045615', expected: americanExpress },
    { cardNumber: '376469153482107', expected: americanExpress },

    { cardNumber: '6011530985109834', expected: discover },
    { cardNumber: '6011919527931434743', expected: discover },
    { cardNumber: '6011402368922771', expected: discover },

    { cardNumber: '3543510940951052', expected: jcb },
    { cardNumber: '3529689855948627864', expected: jcb },
    { cardNumber: '3545743432414010', expected: jcb },

    { cardNumber: '36054877316229', expected: dinersClub },
    { cardNumber: '30103342775901', expected: dinersClub },
    { cardNumber: '36689245412505', expected: dinersClub },
  ])('definitionOfPaymentSystem($cardNumber) — should be returned $expected', ({ cardNumber, expected }) => {
    expect(definitionOfPaymentSystem(cardNumber)).toBe(expected);
  });
});