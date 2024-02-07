$(document).ready(function () {

  function fetchMovieData(movieTitle) {
    var API_KEY = 'a63915c0';
    var movieURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}`;

    fetch(movieURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        localStorage.setItem("searchMovieName", JSON.stringify(data));
        showMovieData(data);
      });
  }

  function showMovieData(data) {
    $(".current-movie").empty();

    $(".current-movie").append(`
        <div class="movieDetails"></div>
        <h2 class="card-title currentMovie"></h2>
        <div class="movie-data poster">
          <img class="movie-poster" alt="movie-poster">
          <h4 class="mb-1 iconTitle"> Movie title</h4>
          <h4 class="movie-cast">movie cast</h4>
          <h4 class="release-date">Release date</h4>
          <h4 class="movie-rating">Movie Rating</h4>
          <div class="col-lg-6 d-flex justify-content-center btn btn-outline-warning mt-3 addMovie" <button class="" data-movie-title="${data.Title}"
          data-movie-poster="${data.Poster}" data-movie-actors="${data.Actors}"
          data-movie-released="${data.Released}" data-movie-imdb-rating="${data.imdbRating}">
          <i class="bi bi-heart-fill"></i>
          Add Movie
          </button>
        </div>
        </div>
      `);

    $(".iconTitle").text(data.Title);
    $(".movie-poster").attr("src", data.Poster);
    $(".movie-cast").text("Cast: " + data.Actors);
    $(".release-date").text("Release Date: " + data.Released);
    $(".movie-rating").text("IMDb Rating: " + data.imdbRating);
  }

  // Search Button Event Listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    var movieTitle = $("#search-input").val().trim();

    if (movieTitle !== "") {
      fetchMovieData(movieTitle);
    }
  });
});
