'use strict';

String.prototype.hashCode = function() {
  let hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    let char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
};

class DOM_Element {
  constructor(myTagName, myId, myClass, myContent, myHref, mySrc) {
    this.myTagName = myTagName;
    this.myClass = myClass;
    this.myId = (myId === ' ') ? (myTagName + myClass + myContent + Math.random()).hashCode() : myId;
    this.myHref = myHref;
    this.myContent = myContent;
    this.mySrc = mySrc;
  }

  render(parentNode) {
    const domElement = document.createElement(this.myTagName);

    domElement.id = this.myId;
    if (this.myClass && this.myClass !==' ') {
      this.myClass.split(' ').forEach(i => domElement.classList.add(i));
    }
    if (this.myContent) {
      domElement.textContent = this.myContent;
    }
    if (this.myHref) {
      domElement.href = this.myHref;
    }
    if (this.mySrc) {
      domElement.src = this.mySrc;
    }

    if (parentNode instanceof DOM_Element) {
      parentNode = document.getElementById(parentNode.myId);
      parentNode.appendChild(domElement);
    } else if (parentNode.nodeType === 1) {
      parentNode.appendChild(domElement);
    } else {
      document.body.appendChild(domElement);
    }
  }

  delete() {
    const elem = document.getElementById(this.myId);
    elem.remove()
  }
}

function updateDOM(data, parentElem) {
  let parent;
  for (const i of data) {
    if (i instanceof Array) {
      updateDOM(i, parent)
    } else {
      const domElem = new DOM_Element(i.tagName, i.id, i.className, i.content, i.href);
      domElem.render(parentElem);
      parent = domElem;
    }
  }
}
