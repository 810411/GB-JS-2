'use strict';

function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function () {
  return this.htmlCode;
};

Container.prototype.remove = function () {
  const item = document.getElementById(this.id);
  item.parentNode.removeChild(item);
};

function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
  let result = `<ul class="${this.className}" id="${this.id}">`;

  Object.getOwnPropertyNames(this.items).forEach(item => {
    if (this.items[item] instanceof MenuItem) {
      result += this.items[item].render();
    }
  });

  result += '</ul>';
  return result;
};

function MenuItem(my_id, my_href, my_name) {
  Container.call(this);
  this.id = my_id;
  this.className = "menu-item";
  this.href = my_href;
  this.name = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
  return `<li class="${this.className}" id="${this.id}">${this.name}</li>`;
};

function MenuTree(my_id, my_class, my_items) {
  Menu.apply(this, arguments);
}

MenuTree.prototype = Object.create(Menu.prototype);
MenuTree.prototype.constructor = MenuTree;
MenuTree.prototype.render = function () {
  let result = `<ul class="${this.className}" id="${this.id}">`;

  Object.getOwnPropertyNames(this.items).forEach(item => {
    const elem = this.items[item];

    if (elem instanceof Menu) {
      result += `<li>${elem.render()}</li>`;
    } else {
      Object.getOwnPropertyNames(elem).forEach(i => {
        if (elem[i] instanceof MenuItem) {
          result += elem[i].render();
        }
      })
    }
  });

  result += '</ul>';
  return result;
};


let m_item1 = new MenuItem("main", "/", "Главная");
let m_item2 = new MenuItem("catalog", "/catalogue", "Каталог");
let m_item3 = new MenuItem("gallery", "/gallery", "Галерея");
let m_items = {0: m_item1, 1: m_item2, 2: m_item3};

let menu = new Menu("my_menu", "menu_class", m_items);
let menuTree = new MenuTree("my_menu", "menu_class", {0: m_items, 1: menu, 2: m_items, 3: menu});

document.body.innerHTML = menuTree.render();
