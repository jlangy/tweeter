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

  const $p = $('<p>').text(tweetData.content.text);

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
    if(tweetLength > MAX_TWEET_LENGTH){
      return alert(`This tweet is more than ${MAX_TWEET_LENGTH} characters. Please be more pithy.`)
    } else if (tweetLength === 0){
      return alert('Please enter some text to tweet.');
    }

    //post tweet and reset
    $.ajax("/tweets", {method: "POST", data: tweetTextInput.serialize()})
      .then(function(){
        tweetTextInput.val('');
        loadTweets();
      });
  });
}

const loadTweets = function(){
  $.ajax('/tweets', {method:"GET"})
    .then(function(data){
      renderTweets(data);
    });
}

//scrolls to the form if not on it, top of articles otherwise.
const setScrollListener = function (event) {
  $('#compose-tweet').slideToggle(500);
}

const goToTop = function(){
  $('html').animate({
    'scrollTop': 0
  }, 500, 'swing', () => {
    $('#scroll-top-btn').css('visibility', 'hidden');
    $('#scroll-btn-container').css('visibility', 'visible');
  });
}

const displayJumpToTopBtn = function(){
  if($(window).scrollTop() > 0){
    $('#scroll-top-btn').css('visibility', 'visible');
    $('#scroll-btn-container').css('visibility', 'hidden');
  } else {
    $('#scroll-top-btn').css('visibility', 'hidden');
    $('#scroll-btn-container').css('visibility', 'visible');
  }
}

$(document).ready(function(){
  $(window).scrollTop(0);
  addSubmitListener();
  loadTweets();
  $('#scroll-btn').on('click', setScrollListener);
  $(window).scroll(displayJumpToTopBtn);
  $('#scroll-top-btn').on('click', goToTop);
});