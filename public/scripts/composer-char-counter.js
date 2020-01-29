$(document).ready(() => {
  $('.new-tweet>form>textarea').on('keyup', function(event){
    console.log($(this).val().length);
  });
});