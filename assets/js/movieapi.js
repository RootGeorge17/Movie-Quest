$(document).ready(function () {

  function fetchMovieData() {
    var API_KEY = 'a63915c0';
    var movieTitle = "The Terminator";

    var movieURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}`;

    fetch(movieURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        showMovieData(data);
      })
  }

  function showMovieData(data) {

  }

  fetchMovieData();
  // Click event handler after submitting search => fetchMovieData()

})
