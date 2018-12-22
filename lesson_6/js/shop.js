$(document).ready(() => {
  const
    firstItem = 1,
    lastItem = 6,
    cart = $('#cart');

  let
    currentImg = firstItem,
    choosen = 0;

  function changeSlides() {
    const imgs = $('.card-img-top');

    let
      nextImg,
      prevImg;

    currentImg = currentImg < firstItem ? lastItem : currentImg > lastItem ? firstItem : currentImg;
    nextImg = currentImg + 1;
    nextImg = nextImg < firstItem ? lastItem : nextImg > lastItem ? firstItem : nextImg;
    prevImg = currentImg - 1;
    prevImg = prevImg < firstItem ? lastItem : prevImg > lastItem ? firstItem : prevImg;

    imgs.get(1).src = `./img/${currentImg}.jpg`;
    imgs.get(0).src = `./img/${prevImg}.jpg`;
    imgs.get(2).src = `./img/${nextImg}.jpg`;
  }

  $('#carousel').click(event => {
    event.preventDefault();

    if (event.target.id === 'prev') {
      currentImg--;
    }
    if (event.target.id === 'next') {
      currentImg++;

    }
    changeSlides();
  });

  $('#main-img').css('cursor', 'move').draggable({
    containment: '#shop',
    helper: 'clone',
    axis: 'y',
    tolerance: 'touch'
  });

  cart.droppable({
    drop: function (event, ui) {
      const col = $('<div class="col-2 p-2"></div>');
      let img = $(ui.helper[0]).clone();

      img.removeAttr('style');
      img.css('cursor', 'pointer');
      img.tooltip();
      img.get(0).title = 'Для удаления клините изображение';
      col.append(img);
      $(this).find('h4').find('span').text(++choosen);
      $(this).find('.row').append(col);
    }
  });

  cart.click(event => {
    if ($(event.target).hasClass('card-img-top')) {
      $(event.target).parent().remove();
      cart.find('h4').find('span').text(--choosen);
    }
  });

  $('#prev').css('cursor', 'pointer');
  $('#next').css('cursor', 'pointer');

  changeSlides();
});
