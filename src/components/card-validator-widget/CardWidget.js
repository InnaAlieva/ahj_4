import luhnValidationOfCard from './luhnValidationOfCard';
import definitionOfPaymentSystem from './definitionOfPaymentSystem';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get markup() {
    return `
      <form class="card-validator-form">
        <h2>Проверка номера карты</h2>
        <ul class="payment-systems">
          <li class="payment-system-img mir" title="МИР"></li>
          <li class="payment-system-img visa" title="Visa"></li>
          <li class="payment-system-img mastercard" title="Mastercard"></li>
          <li class="payment-system-img american-express" title="American Express"></li>
          <li class="payment-system-img discover" title="Discover"></li>
          <li class="payment-system-img jcb" title="JCB"></li>
          <li class="payment-system-img diners-club" title="Diners Club"></li>
        </ul>
        <div class="card-validator-control">
          <input class="card-validator-input" type="text" minlength="12" maxlength="20" placeholder="Введите номер карты...">
          <button class="card-validator-submit">Нажмите для проверки</button>
        </div>
        <div class="card-validator-message"></div>
      </form>
    `;
  }

  static get selector() {
    return '.card-validator-form';
  }

  static get inputSelector() {
    return '.card-validator-input';
  }

  static get submitSelector() {
    return '.card-validator-submit';
  }

  static get messageSelector() {
    return '.card-validator-message';
  }

  static get paymentSystemImageSelector() {
    return '.payment-system-img';
  }

  bindToDOM() {
    this.parentEl.insertAdjacentHTML('beforeEnd', CardWidget.markup);

    this.element = this.parentEl.querySelector(CardWidget.selector);
    this.input = this.element.querySelector(CardWidget.inputSelector);
    this.submit = this.element.querySelector(CardWidget.submitSelector);
    this.message = this.element.querySelector(CardWidget.messageSelector);
    this.paymentSystemImages = [ ...this.element.querySelectorAll(CardWidget.paymentSystemImageSelector) ];

    this.element.addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.input.value.length > 0) {
      this.message.textContent = '';
      this.message.classList.add('warning');
      this.paymentSystemImages.forEach(image => image.classList.add('not-suitable'));
      this.validationAndDefinition();
    }
  }

  onInput() {
    this.message.textContent = '';
    this.message.className = 'card-validator-message';
    this.paymentSystemImages.forEach(image => image.classList.remove('not-suitable'));
  }

  validationAndDefinition() {
    const cardNumber = this.input.value.replace(/\s/g, '');
    const thereAreNoNumbers = /\D/.test(cardNumber);

    if (thereAreNoNumbers) {
      this.message.insertAdjacentHTML('beforeEnd', 'Пожалуйста, вводите только цифры!');
      return;
    }

    const isValid = luhnValidationOfCard(cardNumber);

    if (!isValid) {
      this.message.insertAdjacentHTML('beforeEnd', `Номер карты ${cardNumber} не прошёл проверку!`);
      return;
    }

    const paymentSystem = definitionOfPaymentSystem(cardNumber);
    this.message.className = 'card-validator-message success';

    if (paymentSystem === 'unknown') {
      this.message.insertAdjacentHTML('beforeEnd', `Номер карты ${cardNumber} прошёл проверку! Платёжная система не определена`);
      return;
    }

    const paymentSystemImage = this.paymentSystemImages.find(image => image.classList.contains(paymentSystem));
    paymentSystemImage.classList.remove('not-suitable');
    this.message.insertAdjacentHTML('beforeEnd',
      `Номер карты ${cardNumber} прошёл проверку! Платёжная система — <strong>${paymentSystemImage.title}</strong>`
    );
  }
}