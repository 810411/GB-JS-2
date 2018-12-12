'use strict';

// Шаблон объектов имеющих свойства DOM элементов и методы для создания и удаления DOM элементов на их основе
class DOM_Element {
  constructor(domObj) {
    if (typeof domObj !== 'object') {
      throw new Error('Аргументом конструктора DOM_Element должен быть объект');
    }

    this.tagName = domObj.tagName;
    this.className = domObj.className;
    this.id = domObj.id || (this.tagName + this.className + this.content + Math.random()).hashCode();
    this.href = domObj.href;
    this.content = domObj.content;
    this.src = domObj.src;
  }

  // создание DOM элемента из объекта DOM_Element
  render(parentNode) {
    const domElement = document.createElement(this.tagName);

    domElement.id = this.id;

    if (this.className && this.className !== ' ') {
      this.className.split(' ').forEach(i => domElement.classList.add(i));
    }
    if (this.content) {
      domElement.textContent = this.content;
    }
    if (this.href) {
      domElement.href = this.href;
    }
    if (this.src) {
      domElement.src = this.src;
    }

    if (parentNode instanceof DOM_Element) {
      parentNode = document.getElementById(parentNode.id);
      parentNode.appendChild(domElement);
    } else if (parentNode.nodeType === 1) {
      parentNode.appendChild(domElement);
    } else {
      document.body.appendChild(domElement);
    }
  }

  // удаление DOM элемента созданного из объекта DOM_Element
  delete() {
    const elem = document.getElementById(this.id);
    elem.remove()
  }
}

// генерация простейших хеш-кодов для id объектов DOM_Element
String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    let char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

// генерация блоков DOM дерева на основе данных из массивов объектов с исходными данными для объектов DOM_Element
function updateDOM(data, parentElem) {
  let parent;
  for (const i of data) {
    if (i instanceof Array) {
      updateDOM(i, parent)
    } else {
      const domElem = new DOM_Element(i);
      domElem.render(parentElem);
      parent = domElem;
    }
  }
}
