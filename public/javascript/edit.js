/* global $ window document*/

function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');
  let returner;

  sURLVariables.forEach((paraName) => {
    const sParameterName = paraName.split('=');
    if (sParameterName[0] === sParam) {
      returner = sParameterName[1] === undefined ? true : sParameterName[1];
    }
  });
  return returner;
}

function putData(jsonMovie) {
  $.ajax({
    url: `/movies/${getUrlParameter('id')}`,
    method: 'PUT',
    crossDomain: true,
    data: jsonMovie,
    contentType: 'application/json; charset=utf-8',

  })
  .then(() => {
    window.location.href = 'index.html';
  })
  .catch((response) => {
    console.log('Error: ', response);
  });
}

function getFormData($form) {
  const unindexedArray = $form.serializeArray();
  const indexedArray = {};

  $.map(unindexedArray, (n, i) => {
    indexedArray[n.name] = n.value;
  });

  return indexedArray;
}

$('form').on('submit', (event) => {
  event.preventDefault();
  console.log(getFormData($(this)));
  const jsonMovie = JSON.stringify(getFormData($(this)));
  putData(jsonMovie);
});

function appendData(movie) {
  Reflect.ownKeys(movie).forEach((key) => {
    $(`#${key}`).val(movie[key]);
  });
}

function getData(id) {
  $.ajax({
    url: `/movies/${id}`,
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
  const currentId = (getUrlParameter('id'));
  getData(currentId);
});
