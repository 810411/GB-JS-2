$(document).ready(() => {
  $('nav').delegate('li', 'click', function () {
    if (!$(this).hasClass('selected')) {
      $(this)
        .addClass('selected')
        .siblings().removeClass('selected');

      $('article.selected')
        .hide()
        .removeClass('selected');

      $('article.' + $(this).attr("class").split(' ')[0])
        .slideDown('slow')
        .addClass('selected');
    }
  });
});
