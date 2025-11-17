import { test, describe, expect } from '@jest/globals';
import luhnValidationOfCard from '../../components/card-validator-widget/luhnValidationOfCard';

describe('Testing the `luhnValidationOfCard()` function', () => {
  const errorMessage = 'The `cardNumber` parameter must be a string containing the card number';
  test.each([
    { notCardNumber: '', errorMessage },
    { notCardNumber: 100, errorMessage },
    { notCardNumber: null, errorMessage },
    { notCardNumber: 'qwerty123!@#]', errorMessage },
  ])('luhnValidationOfCard($notCardNumber) — an error should be thrown', ({ notCardNumber, errorMessage }) => {
    expect(() => luhnValidationOfCard(notCardNumber)).toThrow(errorMessage);
  });

  test.each([
    { cardNumber: '378282246310005', expected: true },
    { cardNumber: '378857901070422', expected: true },
    { cardNumber: '349720643053260', expected: true },
    { cardNumber: '379760323694333', expected: true },
    { cardNumber: '4716370900867676', expected: true },
    { cardNumber: '4916109006664142', expected: true },
    { cardNumber: '5101367101542397', expected: true },
    { cardNumber: '2221005981486507', expected: true },
    { cardNumber: '2720995362401651', expected: true },
    { cardNumber: '4539981164798156956', expected: true },
    { cardNumber: '6011834308753891720', expected: true },
    { cardNumber: '3589605968049465863', expected: true },
  ])('luhnValidationOfCard($cardNumber) — should be returned true', ({ cardNumber, expected }) => {
    expect(luhnValidationOfCard(cardNumber)).toBe(expected);
  });

  test.each([
    { cardNumber: '484444648445357', expected: false },
    { cardNumber: '88984163024272', expected: false },
    { cardNumber: '676254097002356', expected: false },
    { cardNumber: '26805444725502', expected: false },
    { cardNumber: '8779879353941748', expected: false },
    { cardNumber: '1651082209953624', expected: false },
    { cardNumber: '69539450732481167', expected: false },
    { cardNumber: '53459680494658634', expected: false },
    { cardNumber: '30875389172058969', expected: false },
  ])('luhnValidationOfCard($cardNumber) — should be returned false', ({ cardNumber, expected }) => {
    expect(luhnValidationOfCard(cardNumber)).toBe(expected);
  });
});