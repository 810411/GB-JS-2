'use strict';

class Hamburger {
  constructor(price = 0, calory = 0) {
    this._price = price;
    this._calory = calory;
  }

  get price() {
    return this._price;
  }

  get calory() {
    return this._calory;
  }

  addFilling(filling) {
    switch (filling) {
      case 'cheese':
        this._price += 10;
        this._calory += 20;
        break;
      case 'salad':
        this._price += 20;
        this._calory += 5;
        break;
      case 'potato':
        this._price += 15;
        this._calory += 10;
        break;
    }
  }

  addMayonnaise() {
    this._price += 20;
    this._calory += 5;
  }

  addCondiment() {
    this._price += 15;
  }
}

class SmallHamburger extends Hamburger {
  constructor() {
    super(50, 20);
  }
}

class BigHamburger extends Hamburger {
  constructor() {
    super(100, 40);
  }
}

const menu = document.querySelector('.menu');
const price = menu.querySelector('.price');
const calory = menu.querySelector('.calory');
const sizeBtns = menu.querySelectorAll('.size button');
const fillingsBtns = menu.querySelectorAll('.filling button');
const additionsBtns = menu.querySelectorAll('.additions button');

let hamburger = {};

function getPrice() {
  price.textContent = hamburger.price.toLocaleString('ru-RU', {style: "currency", currency: "RUB"});
  calory.textContent = `${hamburger.calory} калорий`;
}

function setSize(event) {
  const target = event.currentTarget;
  if (target.textContent === 'Большой') {
    hamburger = new BigHamburger();
  }
  if (target.textContent === 'Маленький') {
    hamburger = new SmallHamburger();
  }

  for (const btn of sizeBtns) {
    btn.classList.replace('btn-success', 'btn-outline-primary');
  }

  target.classList.replace('btn-outline-primary', 'btn-success');

  getPrice();

  for (const btn of fillingsBtns) {
    btn.addEventListener('click', setFillings);
    btn.classList.replace('btn-info', 'btn-outline-info');
    btn.classList.replace('btn-outline-secondary', 'btn-outline-info');
  }
}

function setFillings(event) {
  const target = event.currentTarget;
  let filling;
  if (target.textContent === 'С сыром') {
    filling = 'cheese';
  } else if (target.textContent === 'С салатом') {
    filling = 'salad';
  } else if (target.textContent === 'С картофелем') {
    filling = 'potato';
  }

  hamburger.addFilling(filling);

  target.classList.replace('btn-outline-info', 'btn-info');

  for (const btn of fillingsBtns) {
    btn.classList.replace('btn-outline-info', 'btn-outline-secondary');
    btn.removeEventListener('click', setFillings)
  }

  getPrice();
}

function setAdditions(event) {
  if (hamburger instanceof Hamburger) {
    const target = event.currentTarget;
    if (target.textContent === 'Посыпать приправой') {
      hamburger.addCondiment();
    }
    if (target.textContent === 'Полить майонезом') {
      hamburger.addMayonnaise();
    }
    getPrice();
  }
}

for (const btn of sizeBtns) {
  btn.addEventListener('click', setSize)
}

for (const btn of additionsBtns) {
  btn.addEventListener('click', setAdditions)
}
