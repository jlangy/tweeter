/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweetData){
  const daysAgoCreated = Math.round((Date.now() - new Date(tweetData.created_at)) / 86400000);
  return `<article class="tweet-article">
 
            <header>
              <span><img src="${tweetData.user.avatars}" alt="profile picture">${tweetData.user.name}</span>
              <span class="handle">${tweetData.user.handle}</span>
            </header>
  
            <p>${tweetData.content.text}</p>
  
            <footer>
              <span>${daysAgoCreated} days ago</span>
              <span>abc</span>
            </footer>
 
          </article>`
}

const renderTweets = function(tweetData){
  tweetData.forEach(function(tweet){
    $('.add-tweet-form').after(createTweetElement(tweet));
  });
}

$(document).ready(function(){
  renderTweets(data);
});