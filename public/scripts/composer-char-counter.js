$(document).ready(function(){
  $('#tweet-text').on('keyup', function(event){
    const textArea = $(this);
    const counter = textArea.siblings('span');
    const textLength = MAX_TWEET_LENGTH - textArea.val().length;
    counter.text(textLength);
    textLength < 0 ? counter.addClass('danger-text') : counter.removeClass('danger-text');
  });
});