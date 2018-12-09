'use strict';

const menu = document.getElementById('menu');
const xhr = new XMLHttpRequest();

xhr.open('POST', 'http://127.0.0.1:3000/menu', false);
xhr.send();

if (xhr.readyState === 4) {
  if (xhr.status === 200) {
    updateDOM(JSON.parse(xhr.responseText).menu, menu);
  } else {
    console.error(xhr.status);
  }
}
