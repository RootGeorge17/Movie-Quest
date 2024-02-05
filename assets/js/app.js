console.log("App is working");

//global scope 
let queryUrl = '';

//Searching for a Movies
$("#search-button").on("click", function (event) {
  event.preventDefault();

  //Api Key 
  const apiKey = "AIzaSyCPh_nvXp0kulhY-W1zMJ1jpQBQ2sIsoew";

  //Getting the movie from the search bar adding it in the API
  searchMovieName = $("#search-input").val().trim();

  console.log("Movie Trailer Name:", searchMovieName);

  //if a user search is empty an alert will be displayed
  if (searchMovieName === "") {
    const alertTime = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong> Attention! Enter a movie</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    $("#alert-container").append(alertTime);
    console.log(searchMovieName);
    return;
  }

  //url
  queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchMovieName)}&type=video&videoType=movie&key=${apiKey}`;
  console.log(`"API URL, ${queryUrl}`);

  //Fetching the API Call 
  fetch(queryUrl)
    .then(function (response) {
      return response.json(); //This process is waiting for the response and parsing it into JSON format
    })
    .then(function (results) {
      console.log(results);

      const moviesData = results.items.map(item => ({
        title: item.snippet.title,

      }));

      //storing the data in the local storage 
      localStorage.setItem("searchMovieName", JSON.stringify(moviesData));

      showWatchlist(moviesData);

      addMovieTrailer(results);
    })
    .catch(function (error) {
      console.error(`Error Occurred when Fetching the Youtube API ${error}`);    //handling if an error occurs when fetching 
    });
});

// function to display the video
function addMovieTrailer(data) {

  //finding
  const video = data.items[0].id.videoId;

  //displaying the video in the webpage by using iframes and will be muted once its play 
  const youtubeSrc = `https://www.youtube.com/embed/${video}`;
  const iframeEl = `<iframe id="player" type="text/html" src="${youtubeSrc}" frameborder="0"></frame>`;

  // console.log(`Iframe : ${iframeEl}`);

  //Append the youtube video to the webpage
  $(".movieContainer").html(iframeEl);

  //Present the movie card when the trailer is searched
  $(".movie-card").show();
}

//This will be focusing on WatchList for users
$("#watchlist-btn").on("click", function (event) {
  event.preventDefault();


  //Head to the watchlist
  window.location.href = "watchlist.html";


});

$(document).ready(function () {

  const storedMovies = localStorage.getItem("searchMovieName");
  console.log("storage is ", storedMovies);
  // Parse it and be stored in a array as a JSON
  if (storedMovies !== null) {
    const getMovies = JSON.parse(storedMovies) || [];
    console.log("Display", getMovies);

    //show the movies in the watchlist page 
    showWatchlist(getMovies);
    console.log(getMovies);
  }
});

function showWatchlist(getMovies) {

  //clear 
  $(".watchlist-container").empty()

  getMovies.forEach(function (movie, index) {

    //show only the first video 
    if (index === 0) {
      // add the image for the video 
      const posterImage = $("<img>");
      posterImage.attr("src", movie.poster)
      $(".watchlist-container").append(posterImage)
      // const watchVideoList = $("<div>").text(movie.title);
      console.log("Display succesffully", posterImage);

      //creating the movie cards 

      const movieCards = `<div class="card mb-3 style="18rem";>
      <img src="${posterImage}" class="card-img-top" alt="Movie Thumbnail">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            </div>
            </div>`;
      //adding it in the watchlist container 
      $(".watchlist-container").append(movieCards)
      console.log("display sucessfully", movieCards);
    }
  });
}

//clear btn 
$("#Clear").on("click", function (event) {
  event.preventDefault();


  //remove storage
  localStorage.removeItem("searchMovieName");

  // clear the container 
  $(".watchlist-container").empty()

});
