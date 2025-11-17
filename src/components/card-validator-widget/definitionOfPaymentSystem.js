export default function definitionOfPaymentSystem(cardNumber) {
  const thereAreNoNumbers = /\D/.test(cardNumber);

  if (typeof cardNumber !== 'string' || thereAreNoNumbers || cardNumber.length === 0) {
    throw new Error('The `cardNumber` parameter must be a string containing the card number');
  }

  const mirRegexp = new RegExp('^220[0-4][0-9]{12,15}$');

  const visaRegexp = new RegExp('^4[0-9]{12}(?:[0-9]{0}|[0-9]{3}|[0-9]{6})$');
  const mastercardRegexp = new RegExp(
    '^5[1-5][0-9]{14}|222[1-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12}$'
  );

  const americanExpressRegexp = new RegExp('^3[47][0-9]{13}$');
  const discoverRegexp = new RegExp('^6(?:011|5[0-9]{2})(?:[0-9]{12}|[0-9]{15})$');

  const jcbRegexp = new RegExp('^(?:2131|1800|35[0-9]{2})[0-9]{12,15}$');
  const dinersClubRegexp = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$');

  const clearedCardNumber = cardNumber.replace(/\D/g, '');
  let paymentSystem = 'unknown';

  if (clearedCardNumber.match(mirRegexp)) {
    paymentSystem = 'mir';
  } else if (clearedCardNumber.match(visaRegexp)) {
    paymentSystem = 'visa';
  } else if (clearedCardNumber.match(mastercardRegexp)) {
    paymentSystem = 'mastercard';
  } else if (clearedCardNumber.match(americanExpressRegexp)) {
    paymentSystem = 'american-express';
  } else if (clearedCardNumber.match(discoverRegexp)) {
    paymentSystem = 'discover';
  } else if (clearedCardNumber.match(jcbRegexp)) {
    paymentSystem = 'jcb';
  } else if (clearedCardNumber.match(dinersClubRegexp)) {
    paymentSystem = 'diners-club';
  }

  return paymentSystem;
}