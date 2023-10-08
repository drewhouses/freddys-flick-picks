var enterButtonEl = $(".cover-btn");
var fredsound = ($("#fredSounds").muted = true);
var generateBtnEl = $(".generate-movie-btn");

//audio section
var freddyCoverAudio = new Audio("./assets/audio/thriller-ambient-14563.mp3");
var freddyMainAudio = new Audio("./assets/audio/welcome-to-my-nightmare.mp3");
freddyCoverAudio.autoplay = true;
freddyCoverAudio.play();

// cover page button
enterButtonEl.on("click", function () {
  freddyCoverAudio.pause();
  freddyMainAudio.play();
  $(".main").removeClass("hide"); // try to get title to render asap
  $(".image-container").fadeOut(1200);
});

generateBtnEl.on("click", function () {
  $("section").remove();
  getRandomMovie();
});

function getRandomMovie() {
  var token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGY0ZWU1MDRiNWRiZDc5Y2YxZTQ5MTBkOTIzNDA5ZiIsInN1YiI6IjY1MTM4NmUxYTE5OWE2MDBlMWY5ZTNiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PcGD68kcdBrYlLNbkoPTnlaqeM4K2hlc6WddR0Q1Nns";
  var randomPageNumber = Math.floor(Math.random() * 60);
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
      // console.log(data);
      displayMovieData(data);
    });
}

function displayMovieData(data) {
  var posterEl = $(".movie-poster");
  var movieEl = $(".movie-container");
  var randomMovie = Math.floor(Math.random() * 20);
  var movieTitle = data.results[randomMovie].title;
  var overview = data.results[randomMovie].overview;
  var releaseDate = data.results[randomMovie].release_date;
  var posterPath = data.results[randomMovie].poster_path;
  var posterURL = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  var movieID = data.results[randomMovie].id;

  console.log(randomMovie);
  posterEl.attr("src", posterURL);
  movieEl.append(`<section>Title: ${movieTitle}</section>`);
  movieEl.append(`<section>Release date: ${releaseDate}</section>`);
  movieEl.append("<section>Premise:</section>");
  movieEl.append(`<section>${overview}</section>`);

  getStreamingSources(movieID);
}

function getStreamingSources(movieID) {
  // https://api.watchmode.com/v1/title/movie-49018/details/?apiKey=9rW46Ospub1ydmP9KdRC7wYuxET3uielF9rVoVqm&append_to_response=sources

  fetch(
    `https://api.watchmode.com/v1/title/movie-${movieID}/details/?apiKey=9rW46Ospub1ydmP9KdRC7wYuxET3uielF9rVoVqm&append_to_response=sources`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("This is WatchMode data:\n");
      console.log(data.sources);
      displayStreamingSources(data.sources);
    });
}

function displayStreamingSources(sources) {
  var sourceArray = [];
  var streamingSource = "";
  var streamingSourceEl = $(".streaming-services");

  for (var i = 0; i < sources.length; i++) {
    streamingSource = sources[i].name;

    if (!sourceArray.includes(streamingSource)) {
      sourceArray.push(streamingSource);
    }
  }

  $("<section>", {
    class: "stream-title",
    text: " Catch this movive at the following streaming sites:",
    appendTo: streamingSourceEl,
  });

  for (var j = 0; j < sourceArray.length; j++) {
    streamingSourceEl.append("<section>" + sourceArray[j] + "</section>");
  }
  console.log(sourceArray);
}
