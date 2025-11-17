/* eslint no-cond-assign: "off" */

export default function luhnValidationOfCard(cardNumber) {
  const thereAreNoNumbers = /\D/.test(cardNumber);

  if (typeof cardNumber !== 'string' || thereAreNoNumbers || cardNumber.length === 0) {
    throw new Error('The `cardNumber` parameter must be a string containing the card number');
  }

  let length = cardNumber.length;
  let isEven = false;
  let checksum = 0;

  while (length > 0) {
    length--;
    checksum += '01234567890246813579'.charAt(
      cardNumber.charAt(length) * 1 + ((isEven =! isEven) ? 0 : 10)
    ) * 1;
  }

  return (checksum % 10 == 0); // https://stackoverflow.com/a/25641431
}