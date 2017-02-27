/* global $ window document*/

function deleteMovie(id) {
  $.ajax({
    url: `/movies/${id}`,
    method: 'DELETE',
    crossDomain: true,
  })
  .then((response) => {
    console.log(response);
    window.location.href = 'index.html';
  })
  .catch((response) => {
    console.log('error');
  });
}

function createDiv(current, i) {
  const moviesDiv =
  `<div class="col-lg-3 col-md-4 col-sm-6">
      <article class="card">
          <header class="title-header">
              <h3><span class="title${i}">${current.title}</span> <span class="rating${i}">${current.myRating}</span>/10</h3>
          </header>
          <div class="card-block">
              <div class="img-card">
                  <img src="${current.posterURL}" alt="Movie" class="w-100 img${i}" />
              </div>
              <p class="tagline card-text text-xs-center director${i}">Director: ${current.director}</p>
              <p class="tagline card-text text-xs-center year${i}">Year: ${current.year}</p>
              <a href="edit.html?id=${i}" class="btn btn-primary btn-block myEdit"> Edit </a>
              <button onclick="deleteMovie(${i})" class="btn btn-info btn-block myDelete"> Delete </button>
          </div>
      </article>
  </div>`;
  return moviesDiv;
}

function appendData(movies) {
  movies.forEach((current, i) => {
    $('.myMovies').append(createDiv(current, i));
  });
}

function getDBData() {
  $.ajax({
    url: '/movies',
    method: 'GET',
  })
  .then((response) => {
    console.log(response);
    appendData(response);
  })
  .catch((err) => {
    console.log(err);
  });
}

$(document).ready(() => {
  getDBData();
});
