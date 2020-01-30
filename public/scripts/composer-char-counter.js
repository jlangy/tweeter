//Handle text input into the tweet form, putting appropriate class on the counter
$(document).ready(function(){
  $('#tweet-text').on('keyup', function(event){
    const textArea = $(this);
    const counter = $('#counter');
    const textLength = MAX_TWEET_LENGTH - textArea.val().length;
    counter.text(textLength);
    textLength < 0 ? counter.addClass('danger-text') : counter.removeClass('danger-text');
  });
});