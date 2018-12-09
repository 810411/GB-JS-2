'use strict';

const menuItems = menu.querySelectorAll('#nav li');
const content = document.getElementById('content');

function renderIndex() {
  content.innerHTML = '';

  const h1 = new DOM_Element('h1', ' ', 'center-align', 'Главная страница');
  h1.render(content);

  let pContent = `Приложение написано в исключительно учебных целях, может содержать "deprecations" и прочие 
  несовершенства. Задания: 1 - код приложения, 2 - меню страницы, 3 - "Галерея", 4 - "Обработчик"`;
  const p = new DOM_Element('p', ' ', 'center-align flow-text', pContent);
  p.render(content);
}

function renderCatalog() {
  content.innerHTML = '';

  const h1 = new DOM_Element('h1', ' ', 'center-align', 'Каталог');
  h1.render(content);

  let pContent = `Здесь будет каталог, наверное...`;
  const p = new DOM_Element('p', ' ', 'center-align', pContent);
  p.render(content);
}

function renderContact() {
  content.innerHTML = '';

  const h1 = new DOM_Element('h1', ' ', 'center-align', 'Контакты');
  h1.render(content);

  const div = new DOM_Element('div', ' ', 'row center-align');
  div.render(content);

  let pContent = `Facebook: Григорий Балабанов`;
  const a = new DOM_Element('a', ' ', ' ', pContent, 'https://www.facebook.com/grigorii.balabanov');
  a.render(div);
}

function renderGallery() {
  content.innerHTML = '';

  const h1 = new DOM_Element('h1', ' ', 'center-align', 'Галерея');
  h1.render(content);

  const div = new DOM_Element('div', ' ', 'row center-align');
  div.render(content);

  const view = new DOM_Element('div', ' ', 'row center-align');
  view.render(content);

  let dataHref = './img/acura.jpg';
  const bigImg = new DOM_Element('img', ' ', 'bigImg', ' ', '#', dataHref);
  bigImg.render(view);

  function addImage(data) {
    const col = new DOM_Element('div', ' ', 'col s2');
    col.render(div);
    const img = new DOM_Element('img', ' ', 'circle img', ' ', '#', data.src);
    img.render(col);
    const link = document.getElementById(img.myId);
    link.onclick = () => {
      const viewContent = document.getElementById(view.myId);
      viewContent.innerHTML = '';
      const bigImg = new DOM_Element('img', ' ', 'bigImg', ' ', '#', data.href);
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

  const h1 = new DOM_Element('h1', ' ', 'center-align', 'Обработчик');
  h1.render(content);

  const div = new DOM_Element('div', ' ', 'row center-align');
  div.render(content);

  const a = new DOM_Element('a', ' ', 'waves-effect waves-light btn', 'Нажми меня');
  a.render(div);
  const link = document.getElementById(a.myId);

  let className;

  link.onclick = () => {
    fetch('http://127.0.0.1:3000/handler', {method: 'POST'})
      .then(function (response) {
        return response;
      })
      .then(result => {
        if (result.status === 200) {
          className = 'green-text'
        } else {
          className = 'red-text'
        }
        return result.json();
      })
      .then(result => {
        const div = new DOM_Element('div', ' ', `row center-align ${className}`, JSON.stringify(result));
        div.render(content);
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
