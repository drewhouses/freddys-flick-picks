var enterButtonEl = $(".cover-btn");
var fredsound = ($("#fredSounds").muted = true);
var generateBtnEl = $(".generate-movie-btn");
var token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGY0ZWU1MDRiNWRiZDc5Y2YxZTQ5MTBkOTIzNDA5ZiIsInN1YiI6IjY1MTM4NmUxYTE5OWE2MDBlMWY5ZTNiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PcGD68kcdBrYlLNbkoPTnlaqeM4K2hlc6WddR0Q1Nns";

//audio section
var freddyCoverAudio = new Audio("thriller-ambient-14563.mp3");
var freddyMainAudio = new Audio(
  "I SHOULD WARN YOU PT2 - AUDIO FROM JAYUZUMI.COM.mp3"
);
// freddyCoverAudio.autoplay = true;
// freddyCoverAudio.play();
// CURRENTLY USING THRILLER-AMBIENT & I SHOULD WARN YOU PT2 MP3

// Ask Drew and Art about this error msg: DOMexception user didn't interact with document

// cover page button
enterButtonEl.on("click", function () {
  freddyCoverAudio.pause();
  freddyMainAudio.play();
  $(".main").removeClass("hide"); // try to get title to render asap
  $(".image-container").fadeOut(1200);
});

generateBtnEl.on("click", function () {
  getRandomMovie();
});

function getRandomMovie() {
  var randomPageNumber = Math.floor(Math.random() * 40);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&with_genres=27&page=${randomPageNumber}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayMovieData(data);
    });
}

function displayMovieData(data) {
  var posterEl = $(".movie-poster");
  var movieEl = $(".movie-container");
  var randomMovie = Math.floor(Math.random() * 20);
  var movieTitle = data.results[randomMovie].title;
  var overview = data.results[randomMovie].overview;
  var posterPath = data.results[randomMovie].poster_path;
  var posterURL = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  posterEl.attr("src", posterURL);
  movieEl.append(`<p>Title: ${movieTitle}</p>`);
  movieEl.append("<section>Premise:</section>");
  movieEl.append(`<p>${overview}</p>`);
  movieEl.append(`<p>Some info</p>`);
}
