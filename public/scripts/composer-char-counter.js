$(document).ready(() => {
  $('#tweet-text').on('keyup', function(event){
    const textArea = $(this);
    const counter = textArea.siblings('span');
    const textLength = 140 - textArea.val().length;
    counter.text(textLength);
    textLength < 0 ? counter.addClass('danger-text') : counter.removeClass('danger-text');
  });
});