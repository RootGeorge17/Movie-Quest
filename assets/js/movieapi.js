$(document).ready(function () {
  function fetchMovieData(movieTitle) {
    var API_KEY = 'a63915c0';
    var movieURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}`;

    fetch(movieURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        showMovieData(data);
      });
  }

  function showMovieData(data) {
    $(".current-movie").append(`
        <div class="movieDetails"></div>
        <h2 class="card-title currentMovie"></h2>
        <div class="movie-data poster">
          <img class="movie-poster" alt="movie-poster">
          <h4 class="mb-1 iconTitle"> Movie title</h4>
          <h4 class="movie-cast">movie cast</h4>
          <h4 class="release-date">Release date</h4>
          <h4 class="movie-rating">Movie Rating</h4>
        </div>
      `);

    $(".currentMovie").text(data.Title);
    $(".iconTitle").text(data.Title);
    $(".movie-poster").attr("src", data.Poster);
    $(".movie-cast").text("Cast: " + data.Actors);
    $(".release-date").text("Release Date: " + data.Released);
    $(".movie-rating").text("IMDb Rating: " + data.imdbRating);
  }

  $("#search-button").on("click", function (event) {
    event.preventDefault();

    var movieTitle = $("#search-input").val().trim();

    if (movieTitle !== "") {
      fetchMovieData(movieTitle);
    }
  });
});
