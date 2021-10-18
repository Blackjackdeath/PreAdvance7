let card = '';
let arrSerch = [];
let serchRequest = '';

function requestInfo(id) {
  return fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=cc8acbe3`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      writeInfo(data)
      $('.modal').css({ 'top': window.scrollY + 'px' });
      $('body').css({ 'overflow-y': 'hidden' });
      $('.modal').show();
    }
    )
    .catch(err => console.log(err));
}

function writeInfo(info) {
  $('.modalBoxInfoPoster__Image').attr('src', info.Poster);
  $('.modalBoxInfoTextTitle__Name').text(info.Title);
  $('.modalBoxInfoText__Genre').text(info.Rated+' '+info.Year+' '+info.Genre);
  $('.modalBoxInfoText__Plot').text(info.Plot);
  $('.modalBoxInfoText__Writer').html($('.modalBoxInfoText__Writer').html()+' '+info.Writer);
  $('.modalBoxInfoText__Director').html($('.modalBoxInfoText__Director').html()+' '+info.Director);
  $('.modalBoxInfoText__Actors').html($('.modalBoxInfoText__Actors').html()+' '+info.Actors);
  $('.modalBoxInfoText__BoxOffice').html($('.modalBoxInfoText__BoxOffice').html()+' '+info.BoxOffice);
  $('.modalBoxInfoText__Awards').html($('.modalBoxInfoText__Awards').html()+' '+info.Awards);
  for (let i=0; i<info.Ratings.length; i++){
      $('.modalBoxInfoText').append(`<p class="infoText">${info.Ratings[i].Source} ${info.Ratings[i].Value}</p>`);
  }
}

$(document).ready(function () {
  $('.clear').on('click', function(){
    $('.inputSerch').val('');
    $(this).css({'opacity': '0'});
  })
  $('.buttonSerch').on('click', function () {
    arrSerch = [];
    serchRequest = '';
    card='';
    if ($('.inputSerch').val() == '') {
      alert('Enter name film');
    }
    if ($('.inputSerch').val().length<2){
      alert('Enter min 3 symbol');
    }
    else {
      arrSerch = $('.inputSerch').val().split(' ');
      for (let i = 0; i < arrSerch.length; i++) {
        if (i == 0) {
          serchRequest = '?s=' + arrSerch[i];
        }
        else {
          serchRequest += '+' + arrSerch[i];
        }
      }
      $('.result').html('');
      return fetch(`http://www.omdbapi.com/${serchRequest}&apikey=cc8acbe3`)
        .then(response => response.json())
        .then(data => {
          for (let i = 0; i < data.Search.length; i++) {
            card += ` <div class="card">
                   <img src="${data.Search[i].Poster}" alt="" srcset="" class="cardImage">
                   <div class="cardTitle">
                       <h1 class="cardTitle__text">${data.Search[i].Title}</h1>
                       </div>
                       <p class="card__type">${data.Search[i].Type}</p>
                       <p class="card__year">${data.Search[i].Year}</p>
                       <button type="button" class="card__Button" imdbID="${data.Search[i].imdbID}">More details</button>
                   </div>`;
          }
          $('.result').html(card);
          $('.card').fadeIn(500);
        })
        .catch(err => console.log(err));
    }

  });
  $(document).on('click', '.card__Button', function () {
    requestInfo($(this).attr('imdbID'));

  })
  $('.modal').on('click', function () {
    $('body').css({ 'overflow-y': 'auto' });
    $('.modal').hide();
  })
});

document.querySelector('.inputSerch').oninput=function () {
  if (!this.value==''){
    document.querySelector('.clear').style.opacity = 1;
  }
  else {
    document.querySelector('.clear').style.opacity = 0;
  }
}


