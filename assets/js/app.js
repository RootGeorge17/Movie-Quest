$("#search-button").on("click", function (event) {
  event.preventDefault();

  const apiKey = "AIzaSyB7_wPfd2E3WCflXd_mQD5GX_7_4iZhFZg"; //Api Key

  //Getting the movie from the search bar adding it in the API
  searchMovieName = $("#search-input").val().trim();

  //if a user search is empty an alert will be displayed
  if (searchMovieName === "") {
    $("#alert-container").append(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong> Attention! Enter a movie</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
    return;
  }

  var queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchMovieName + " trailer"
  )}&type=video&videoCategoryId=1&key=${apiKey}`;

  //Fetching the API Call
  fetch(queryUrl)
    .then(function (response) {
      return response.json(); //This process is waiting for the response and parsing it into JSON format
    })
    .then(function (results) {
      const moviesData = results.items.map((item) => ({
        title: item.snippet.title,
      }));

      addMovieTrailer(results);
    })
    .catch(function (error) {
      //handling if an error occurs when fetching
      $("#alert-container").append(`
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error Occurred when Fetching the Youtube API ${error}</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`);
    });
});

// function to display the video
function addMovieTrailer(data) {
  //finding
  const video = data.items[0].id.videoId;
  //displaying the video in the webpage by using iframes and will be muted once its play
  const youtubeSrc = `https://www.youtube.com/embed/${video}`;
  const iframeEl = `<iframe id="player" type="text/html" src="${youtubeSrc}" frameborder="0" height="500"></iframe>`;

  //Append the youtube video to the webpage
  $(".movieContainer").html(iframeEl);

  //Present the movie card when the trailer is searched
  $(".movie-card").show();
}

//clear btn
$("#Clear").on("click", function (event) {
  event.preventDefault();
  //remove storage
  localStorage.removeItem("movieList");

  $(".no-movies").text("No movies currently in your watchlist");

  // clear the container
  $(".watchlist-container").empty();
});

$(document).ready(function () {
  $(".current-movie").on("click", ".addMovie", function (event) {
    event.preventDefault();

    // Get movie details from data attributes
    const movieTitle = $(this).data("movie-title");
    const moviePoster = $(this).data("movie-poster");
    const movieActors = $(this).data("movie-actors");
    const movieReleased = $(this).data("movie-released");
    const movieRating = $(this).data("movie-imdb-rating");

    // Create a movie object
    const movie = {
      Title: movieTitle,
      Poster: moviePoster,
      Actors: movieActors,
      Released: movieReleased,
      Rating: movieRating,
    };

    // Get the existing watchlist from local storage
    let watchListStored = JSON.parse(localStorage.getItem("movieList")) || [];

    // Check if the movie already exists in the watchlist
    const existingIndex = watchListStored.findIndex(
      (savedMovie) => savedMovie.Title === movie.Title
    );

    if (existingIndex === -1) {
      // Movie does not exist in the watchlist, so add it
      watchListStored.push(movie);

      // Store the updated watchlist in local storage
      localStorage.setItem("movieList", JSON.stringify(watchListStored));

      // Show success alert
      $("#alert-success").fadeIn();
      setTimeout(function () {
        $("#alert-success").fadeOut();
      }, 3000);
    } else {
      // Show error alert because movie already exists in the watchlist
      if ($("#alert-container").find(".alert-warning").length === 0) {
        $("#alert-container").append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>This movie is already in your watch list!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`);
      }
    }
  });
});

//This is the WatchList button on the navbar for users to see whats added
//This will be focusing on WatchList for users
$("#watchlist-link").on("click", function (event) {
  event.preventDefault();

  //Head to the watchlist
  window.location.href = "watchlist.html";
});

let savedMovies = JSON.parse(localStorage.getItem("movieList")) || [];

if (savedMovies.length === 0) {
  $(".no-movies").text("No movies currently in your watchlist");
}

let textTest = $(".watchlist-container");
for (let i = 0; i < savedMovies.length; i++) {
  let value = savedMovies[i];

  let col = $("<div>");
  col.addClass("col-lg mb-3 mb-sm-0");
  let card = $("<div>");
  card.addClass("card");
  let cardBody = $("<div>");
  cardBody.addClass("card-body border");

  //creating the movie card
  const movieCard = `
        <div class="col mb-3 mb-sm-2">
        <div class="card" >
        <div class="card-body text-light">
        <img class="mb-3"src="${value.Poster}">
        <h1 class="card-title">${value.Title}</h1>
          <h3 class="card-title">${value.Actors}</h3>
          <h3 class="card-title">${value.Released}</h3>
          <h3 class="card-title">${value.Rating}</h3>
        </div>
        </div>
        </div>`;

  $(".watchlist-container").append(movieCard);
}