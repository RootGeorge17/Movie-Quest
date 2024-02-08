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
      <h4 class="mb-1 iconTitle"></h4>
      <h4 class="movie-cast"></h4>
      <h4 class="release-date"></h4>
      <h4 class="movie-rating"></h4>
        <button class="col d-flex justify-content-center btn btn-outline-warning mt-3 addMovie" data-movie-title="${data.Title}" data-movie-poster="${data.Poster}" data-movie-actors="${data.Actors}" data-movie-released="${data.Released}" data-movie-imdb-rating="${data.imdbRating}">
        <i class="bi bi-heart-fill"></i>
          Add Movie
        </button>
    </div>
`);

    $(".iconTitle").text(data.Title ? data.Title : "No Movie Title Available");
    $(".movie-poster").attr("src", data.Poster ? data.Poster : "No Movie Poster Available");
    $(".movie-cast").text("Cast: " + data.Actors ? data.Actors : "No Movie Actors Available");
    $(".release-date").text("Release Date: " + data.Released ? data.Released : "No Movie Release Date Available");
    $(".movie-rating").text("IMDb Rating: " + data.imdbRating ? data.imdbRating : "No Movie imdb rating Available");
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
