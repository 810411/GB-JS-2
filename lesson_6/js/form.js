$(document).ready(() => {
  function reviewList() {
    const getData = JSON.parse(localStorage.getItem('data'));

    if (getData != null) {
      if (getData.hasOwnProperty('arr')) {
        $('#messages').children().remove();
        getData.arr.forEach(data => renderMessage(data))
      }
    }
  }

  function postStorage() {
    const data = {arr: []};

    $('#messages').children().each(function () {
      const thisElem = $(this);
      const dataObj = {
        datatime: thisElem.find('.date').text(),
        name: thisElem.find('.name').text(),
        datepicker: thisElem.find('.datepicker').text(),
        message: thisElem.find('.message').text(),
        like: thisElem.find('.like').text()
      };

      data.arr.push(dataObj);
    });

    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(data));
  }

  function reviewAdd(dataObj) {
    renderMessage(dataObj);
    postStorage();
  }

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

  function reviewDelete() {
    event.preventDefault();

    $(this).parents('.card').remove();

    postStorage();
  }

  function renderMessage(dataObj) {
    const domElem = $($('template[data-template]').html());

    domElem.find('.date').text(dataObj.datatime);
    domElem.find('.name').text(dataObj.name);
    domElem.find('.datepicker').text(dataObj.datepicker);
    domElem.find('.message').text(dataObj.message);
    domElem.find('.like').text(dataObj.like);
    domElem.find('.like').on('click', reviewSubmit);
    domElem.find('.delete').on('click', reviewDelete);

    $('#messages').append(
      domElem
    );
  }

  function validate(dataObj) {
    const
      nameRule = /^[a-z ]{3,}|[а-я ]{3,}$/i,
      datepickerRule = /^\d{2}\/\d{2}\/\d{4}$/;
    let result = true;
    let resultMessage = '';

    if (!nameRule.test(dataObj.name)) {
      $('#name').effect('pulsate', 'slow');
      result = false;
      resultMessage += 'Проверьте правильность ввода имени. ';
    }
    if (!datepickerRule.test(dataObj.datepicker)) {
      $('#datepicker').effect('pulsate', 'slow');
      result = false;
      resultMessage += 'Проверьте правильность ввода даты. ';
    }
    if (dataObj.message === '') {
      $('#message').effect('pulsate', 'slow');
      result = false;
      resultMessage += 'Введите сообщение. ';
    }

    $('#warning').find('p').text(resultMessage);

    return result;
  }

  $('form').submit(() => {
    event.preventDefault();
    const
      form = $('form'),
      addData = {
        datatime: new Date().toLocaleString('ru'),
        like: 'Like'
      };

    form.find('input, textarea').each(function () {
      if (this.id !== 'submit') {
        addData[this.id] = $(this).val();
      }
    });

    if (validate(addData)) {
      reviewAdd(addData);

      form.find('input, textarea').each(function () {
        if (this.id !== 'submit') {
          $(this).val('');
        }
      });
    } else {
      $('#warning').dialog('open');
    }
  });

  $('#datepicker').datepicker();

  $('[title]').tooltip({
    position: { at: "center bottom" }
  });

  $('#warning').dialog({
    autoOpen: false,
    position: {
      my: "center",
      at: "center",
      of: window
    },
    show: {
      effect: "fade",
      duration: 1000
    },
    hide: {
      effect: "fade",
      duration: 1000
    },
    buttons: {
      Ok: function () {
        $(this).dialog('close');
      }
    }
  });

  let $dialog = $('.ui-dialog');
  $dialog.addClass('modal-content text-center');
  $dialog.find('.ui-dialog-titlebar-close').css('display', 'none');
  $dialog.find('.ui-dialog-content').toggleClass('ui-dialog-content ui-widget-content modal-body');
  $dialog.find('button').toggleClass('ui-button ui-corner-all ui-widget btn btn-outline-primary');

  reviewList();
});
