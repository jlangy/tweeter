/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const MAX_TWEET_LENGTH = 140;
const NAV_HEIGHT = 120;

const createTweetElement = function(tweetData){
  const daysAgoCreated = Math.round((Date.now() - new Date(tweetData.created_at)) / 86400000);
  const $avatar = $('<span>')
                    .text(tweetData.user.name)
                    .prepend($('<img/>')
                    .attr({'src':tweetData.user.avatars, "alt":"profile picture"}));

  const $header = $('<header>')
                    .append($avatar)
                    .append($('<span>')
                    .addClass('handle')
                    .text(tweetData.user.handle));

  const $p = $('<p>').addClass('tweet-content').text(tweetData.content.text);

  const $footer = $('<footer>')
                    .append($('<span>')
                    .text(`${daysAgoCreated} days ago`))
                    .append($('<span>')
                    .text('abc'));

  return $('<article>')
          .addClass('tweet-article')
          .append($header)
          .append($p)
          .append($footer);
}

const renderTweets = function(tweetData){
  //clear out previous tweets
  const articleContainer = $('#articles-container');
  articleContainer.empty();

  //add new tweets
  tweetData.forEach(function(tweet){
    articleContainer.prepend(createTweetElement(tweet));
  });
}

const addSubmitListener = function(){
  $('#add-tweet-form').submit(function(event){
    event.preventDefault();
    const tweetTextInput = $('#tweet-text');
    const tweetLength = tweetTextInput.val().length;
    
    //handle errors
    $('#alert').slideUp(500);
    if(tweetLength > MAX_TWEET_LENGTH){
      $('#alert-msg').text(`The tweet must be less than ${MAX_TWEET_LENGTH} characters, please be more pithy.`);
      return $('#alert').slideDown();
    } else if (tweetLength === 0){
      $('#alert-msg').text(`Please write something below in order to send a tweet.`);
      return $('#alert').slideDown();
    }
    //post tweet and reset
    $.ajax("/tweets", {method: "POST", data: tweetTextInput.serialize()})
      .then(function(){
        tweetTextInput.val('');
        loadTweets();
        $('.counter').text(MAX_TWEET_LENGTH);
      });
  });
}

const loadTweets = function(){
  $.ajax('/tweets', {method:"GET"})
    .then(function(data){
      renderTweets(data);
    });
}


const toggleForm = function (event) {
  $('#compose-tweet').slideToggle(500, function(){
      $('#tweet-text').focus();
  });
  $('#alert').slideUp(500);
}

const goToTop = function(){
  $('html').animate({
    'scrollTop': 0
  }, 500, 'swing', () => {
    $('#scroll-top-btn').css('visibility', 'hidden');
    $('#toggle-form-btn-container').css('visibility', 'visible');
    $('#tweet-text').focus();
  });
}

const displayJumpToTopBtn = function(){
  if($(window).scrollTop() > 0){
    $('#scroll-top-btn').css('visibility', 'visible');
    $('#toggle-form-btn-container').css('visibility', 'hidden');
  } else {
    $('#scroll-top-btn').css('visibility', 'hidden');
    $('#toggle-form-btn-container').css('visibility', 'visible');
  }
}

$(document).ready(function(){
  $('#alert').hide();
  loadTweets();
  addSubmitListener();
  $('#scroll-top-btn').on('click', goToTop);
  $('#toggle-form-btn').on('click', toggleForm);
  $(window).scroll(displayJumpToTopBtn);
});