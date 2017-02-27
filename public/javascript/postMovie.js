/* global $ window*/

const currentMovie = {};


$('.addMovie').click(() => {
  currentMovie.title = $('.title').val();
  currentMovie.director = $('.director').val();
  currentMovie.year = $('.year').val();
  currentMovie.myRating = $('.myRating').val();
  currentMovie.posterURL = $('.posterUrl').val();
  $.ajax({
    url: '/movies',
    method: 'POST',
    crossDomain: true,
    data: JSON.stringify(currentMovie),
    contentType: 'application/json; charset=utf-8',

  })
  .then((response) => {
    console.log(response);
    window.location.href = 'index.html';
  })
  .catch((response) => {
    console.log('error');
  });
});
