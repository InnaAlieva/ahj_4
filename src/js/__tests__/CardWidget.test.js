/** @jest-environment jsdom */

import { test, describe, expect } from '@jest/globals';
import CardWidget from '../../components/card-validator-widget/CardWidget';

const mir = 'mir';
const visa = 'visa';
const mastercard = 'mastercard';
const americanExpress = 'american-express';
const discover = 'discover';
const jcb = 'jcb';
const dinersClub = 'diners-club';

describe('Testing the `CardWidget` class', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const cardWidget = new CardWidget(container);
  cardWidget.bindToDOM();

  test('The card validator widget should be rendered', () => {
    expect(container.innerHTML).toEqual(CardWidget.markup);
  });

  test('Something other than numbers was entered into the input field', () => {
    cardWidget.input.value = '1q2w3e45';
    cardWidget.submit.click();
    expect(cardWidget.message.classList.contains('warning')).toBeTruthy();
    expect(cardWidget.message.textContent).toBe('Пожалуйста, вводите только цифры!');
  });

  test('An invalid card number was entered into the input field', () => {
    cardWidget.input.value = '30875389172058969';
    cardWidget.submit.click();
    expect(cardWidget.message.classList.contains('warning')).toBeTruthy();
    expect(cardWidget.message.textContent).toBe('Номер карты 30875389172058969 не прошёл проверку!');
  });

  test.each([
    { cardNumber: '0604967736325457' }, { cardNumber: '0604651467779849' },
    { cardNumber: '6763975650898858' }, { cardNumber: '6379451800282712' },
    { cardNumber: '6380865129911817' }, { cardNumber: '6374124534204964' },
  ])('An valid $cardNumber with an unknown payment system was entered into the input field', ({ cardNumber }) => {
    cardWidget.input.value = cardNumber;
    cardWidget.submit.click();
    expect(cardWidget.message.classList.contains('success')).toBeTruthy();
    expect(cardWidget.message.textContent).toBe(`Номер карты ${cardNumber} прошёл проверку! Платёжная система не определена`);
  });

  test.each([
    { cardNumber: '2200990572429475555', paymentSystem: mir },
    { cardNumber: '2200743205284812', paymentSystem: mir },
    { cardNumber: '2201013729000543', paymentSystem: mir },
    { cardNumber: '2202539631353066', paymentSystem: mir },
    { cardNumber: '2203023811716805', paymentSystem: mir },
    { cardNumber: '2204689454283243', paymentSystem: mir },

    { cardNumber: '4130137008588', paymentSystem: visa },
    { cardNumber: '4485827527222113', paymentSystem: visa },
    { cardNumber: '4556782887816113402', paymentSystem: visa },

    { cardNumber: '5519663850859842', paymentSystem: mastercard },
    { cardNumber: '2221001183848925', paymentSystem: mastercard },
    { cardNumber: '2720997042058703', paymentSystem: mastercard },

    { cardNumber: '379279782272077', paymentSystem: americanExpress },
    { cardNumber: '378493466045615', paymentSystem: americanExpress },
    { cardNumber: '376469153482107', paymentSystem: americanExpress },

    { cardNumber: '6011530985109834', paymentSystem: discover },
    { cardNumber: '6011919527931434743', paymentSystem: discover },
    { cardNumber: '6011402368922771', paymentSystem: discover },

    { cardNumber: '3543510940951052', paymentSystem: jcb },
    { cardNumber: '3529689855948627864', paymentSystem: jcb },
    { cardNumber: '3545743432414010', paymentSystem: jcb },

    { cardNumber: '36054877316229', paymentSystem: dinersClub },
    { cardNumber: '30103342775901', paymentSystem: dinersClub },
    { cardNumber: '36689245412505', paymentSystem: dinersClub },
  ])('An valid $cardNumber with a known payment system was entered into the input field', ({ cardNumber, paymentSystem }) => {
    cardWidget.input.value = cardNumber;
    cardWidget.submit.click();
    expect(cardWidget.message.classList.contains('success')).toBeTruthy();

    const paymentSystemImage = cardWidget.paymentSystemImages.find(image => image.classList.contains(paymentSystem));
    expect(cardWidget.message.textContent).toBe(
      `Номер карты ${cardNumber} прошёл проверку! Платёжная система — ${paymentSystemImage.title}`
    );
  });

  test('An valid card number with spaces was entered into the input field and calling the `onInput` method', () => {
    cardWidget.input.value = '5519 6638 5085 9842';
    cardWidget.submit.click();
    expect(cardWidget.message.classList.contains('success')).toBeTruthy();
    expect(cardWidget.message.textContent).toBe(
      'Номер карты 5519663850859842 прошёл проверку! Платёжная система — Mastercard'
    );
    cardWidget.onInput();
    expect(cardWidget.message.textContent).toBeFalsy();
  });
});