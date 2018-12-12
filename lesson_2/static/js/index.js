'use strict';

const menuItems = menu.querySelectorAll('#nav li');
const content = document.getElementById('content');

function renderIndex() {
  content.innerHTML = '';

  const h1 = new DOM_Element({"tagName": "h1", "className": "center-align", "content": "Главная страница"});
  h1.render(content);

  let pContent = `☺ Приложение написано в исключительно учебных целях, может содержать "deprecations" и прочие 
  несовершенства. Задания: 1 - код приложения, 2 - меню страницы, 3 - "Галерея", 4 - "Обработчик". Для работы приложения 
  требуется установленная node.js, перейти в папку проекта, установить зависимости: npm install, запуск сервера: npm start`;
  const p = new DOM_Element({"tagName": "p", "className": "flow-text", "content": pContent});
  p.render(content);
}

function renderCatalog() {
  content.innerHTML = '';

  const h1 = new DOM_Element({"tagName": "h1", "className": "center-align", "content": "Каталог"});
  h1.render(content);

  let pContent = `Здесь будет каталог, наверное...`;
  const p = new DOM_Element({"tagName": "p", "className": "center-align", "content": pContent});
  p.render(content);
}

function renderContact() {
  content.innerHTML = '';

  const h1 = new DOM_Element({"tagName": "h1", "className": "center-align", "content": "Контакты"});
  h1.render(content);

  const div = new DOM_Element({"tagName": "div", "className": "row center-align"});
  div.render(content);

  let pContent = `Facebook: Григорий Балабанов`;
  const a = new DOM_Element({
    "tagName": "a",
    "content": pContent,
    "href": "https://www.facebook.com/grigorii.balabanov"
  });
  a.render(div);
}

function renderGallery() {
  content.innerHTML = '';

  const h1 = new DOM_Element({"tagName": "h1", "className": "center-align", "content": "Галерея"});
  h1.render(content);

  const div = new DOM_Element({"tagName": "div", "className": "row center-align"});
  div.render(content);

  const view = new DOM_Element({"tagName": "div", "className": "row center-align"});
  view.render(content);

  const bigImg = new DOM_Element({"tagName": "img", "className": "bigImg", "src": "./img/acura.jpg"});
  bigImg.render(view);

  function addImage(data) {
    const col = new DOM_Element({"tagName": "div", "className": "col s2"});
    col.render(div);
    const img = new DOM_Element({"tagName": "img", "className": "img", "src": data.src});
    img.render(col);
    const link = document.getElementById(img.id);
    link.onclick = () => {
      const viewContent = document.getElementById(view.id);
      viewContent.innerHTML = '';
      const bigImg = new DOM_Element({"tagName": "img", "className": "bigImg", "src": data.href});
      bigImg.render(view);
    }
  }

  fetch('http://127.0.0.1:3000/gallery', {method: 'POST'})
    .then(function (response) {
      return response.json();
    })
    .then(result => result.gallery.forEach(i => addImage(i)))
    .catch(console.error);
}

function renderHandler() {
  content.innerHTML = '';

  const h1 = new DOM_Element({"tagName": "h1", "className": "center-align", "content": "Обработчик"});
  h1.render(content);

  const div = new DOM_Element({"tagName": "div", "className": "row center-align"});
  div.render(content);

  const a = new DOM_Element({
    "tagName": "a",
    "className": "waves-effect waves-light btn-large",
    "content": "Нажми меня"
  });
  a.render(div);
  const link = document.getElementById(a.id);
  link.classList.add('teal');

  let className;

  link.onclick = () => {
    fetch('http://127.0.0.1:3000/handler', {method: 'POST'})
      .then(function (response) {
        return response;
      })
      .then(result => {
        if (result.status === 200) {
          link.classList.replace('red', 'teal')
        } else {
          link.classList.replace('teal', 'red')
        }
        return result.json();
      })
      .then(result => {
        link.textContent = `${result.result}, нажми снова`;
      })
      .catch(console.error);
  }
}

function clickMenu(event) {
  event.preventDefault();

  if (event.currentTarget.id === 'main') {
    renderIndex();
  } else if (event.currentTarget.id === 'catalog') {
    renderCatalog();
  } else if (event.currentTarget.id === 'contact') {
    renderContact();
  } else if (event.currentTarget.id === 'gallery') {
    renderGallery();
  } else if (event.currentTarget.id === 'handler') {
    renderHandler();
  }
}

renderIndex();

for (const item of menuItems) {
  item.addEventListener('click', clickMenu)
}
