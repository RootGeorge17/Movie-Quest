$(document).ready(function () {
  function fetchMovieData(movieTitle) {
    var API_KEY = 'a63915c0';
    var movieURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}`;

    fetch(movieURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        showMovieData(data);
      });
  }

  function showMovieData(data) {
    $(".currentMovie").text(data.Title);
    $(".iconTitle").text(data.Title);
    $(".movie-poster").attr("src", data.Poster);
    $(".movie-cast").text("Cast: " + data.Actors);
    $(".release-date").text("Release Date: " + data.Released);
    $(".movie-rating").text("IMDb Rating: " + data.imdbRating);
  }

  $("#search-form").submit(function (event) {
    event.preventDefault();
    var movieTitle = $("#search-input").val().trim();
    console.log("Form submitted");

    if (movieTitle !== "") {
      fetchMovieData(movieTitle);
    }
  });
});
