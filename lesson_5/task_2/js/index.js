$(document).ready(() => {

  // симуляция get запроса на сервер для получения сохраненных отзывов, используем Local Storage браузера
  function reviewList() {
    const getData = JSON.parse(localStorage.getItem('data'));

    if (getData != null) {
      if (getData.hasOwnProperty('arr')) {
        $('#messages').children().remove();
        getData.arr.forEach(data => renderMessage(data))
      }
    }
  }

  // симуляция POST запрос для изменения сохраненных отзывов, используем Local Storage браузера
  function postStorage() {
    const data = { arr: [] };

    $('#messages').children().each(function() {
      const thisElem = $(this);
      const dataObj = {
        datatime: thisElem.find('.date').text(),
        name: thisElem.find('.name').text(),
        message: thisElem.find('.message').text(),
        like: thisElem.find('.like').text()
      };

      data.arr.push(dataObj);
    });

    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(data));
  }

  // добавляем отзыв
  function reviewAdd(dataObj) {
    renderMessage(dataObj);
    postStorage();
  }

  // одобряем отзыв
  function reviewSubmit() {
    event.preventDefault();

    const thisElem = $(this);

    if (thisElem.text() === 'Like') {
      thisElem.text('Liked')
    } else {
      thisElem.text('Like')
    }

    postStorage();
  }

  // удаляем отзыв
  function reviewDelete() {
    event.preventDefault();

    $(this).parents('.card').remove();

    postStorage();
  }


  // добавляем отзыв в DOM
  function renderMessage(dataObj) {
    const domElem = $($('template[data-template]').html());

    domElem.find('.date').text(dataObj.datatime);
    domElem.find('.name').text(dataObj.name);
    domElem.find('.message').text(dataObj.message);
    domElem.find('.like').text(dataObj.like);
    domElem.find('.like').on('click', reviewSubmit);
    domElem.find('.delete').on('click', reviewDelete);

    $('#messages').append(
      domElem
    );
  }

  // слушаем форму
  $('form').submit(() => {
    event.preventDefault();
    const addData = {
      datatime: new Date().toLocaleString('ru'),
      like: 'Like'
    };

    $('form').find('input, textarea').each(function () {
      if (this.id !== 'submit') {
        addData[this.id] = $(this).val();
        $(this).val('');
      }
    });

    reviewAdd(addData);
    $('#submit').get(0).disabled = true;
  });

  // валидация ввода имени
  $('#name').change(() => {
    const nameRule = /^[a-z ]{3,}|[а-я ]{3,}$/i;

    $('#submit').get(0).disabled = !nameRule.test($('#name').val());
  });

  reviewList();
});
