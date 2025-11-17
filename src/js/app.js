// TODO: write code here

import CardWidget from '../components/card-validator-widget/CardWidget';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.content');
  const cardWidget = new CardWidget(container);

  cardWidget.bindToDOM();
});