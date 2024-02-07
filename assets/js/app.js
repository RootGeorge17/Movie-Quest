$("#search-button").on("click", function (event) {
  event.preventDefault();

  //Api Key 
  const apiKey = "AIzaSyCPh_nvXp0kulhY-W1zMJ1jpQBQ2sIsoew";

  //Getting the movie from the search bar adding it in the API
  searchMovieName = $("#search-input").val().trim();
  console.log(searchMovieName);

  //if a user search is empty an alert will be displayed
  if (searchMovieName === "") {
    $("#alert-container").append(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong> Attention! Enter a movie</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
    return;
  }

  var queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchMovieName + " trailer")}&type=video&videoCategoryId=1&key=${apiKey}`;
  console.log(queryUrl);

  //Fetching the API Call 
  fetch(queryUrl)
    .then(function (response) {
      return response.json(); //This process is waiting for the response and parsing it into JSON format
    })
    .then(function (results) {
      const moviesData = results.items.map(item => ({
        title: item.snippet.title,
      }));

      showWatchlist(moviesData);
      addMovieTrailer(results);

    })
    .catch(function (error) {
      //handling if an error occurs when fetching 
      console.error(`Error Occurred when Fetching the Youtube API ${error}`);
    });
});

// function to display the video
function addMovieTrailer(data) {

  //finding
  const video = data.items[0].id.videoId;
  console.log(video);
  //displaying the video in the webpage by using iframes and will be muted once its play 
  const youtubeSrc = `https://www.youtube.com/embed/${video}`;
  const iframeEl = `<iframe id="player" type="text/html" src="${youtubeSrc}" frameborder="0" height="500"></iframe>`;

  //Append the youtube video to the webpage
  $(".movieContainer").html(iframeEl);

  //Present the movie card when the trailer is searched
  $(".movie-card").show();
}

function showWatchlist(getMovies) {
  $(".watchlist-container").empty();

  // Iterate over getMovies
  getMovies.forEach(function (movie, index) {
    //show only the first video 
    if (index === 0) {
      // add the image for the video 
      const posterImage = $("<img>");
      posterImage.attr("src", movie.Poster); // Setting the src attribute from movie.Poster
      $(".watchlist-container").append(posterImage);

      //creating the movie card 
      const movieCard = `
          <div>
            <h1 class="card-title">${movie.Title}</h1>
            <h3 class="card-title">${movie.Actors}</h3>
            <h3 class="card-title">${movie.Released}</h3>
            <h3 class="card-title">${movie.imdbRating}</h3>
          </div>`;

      //adding it in the watchlist container 
      $(".watchlist-container").append(movieCard);
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

//Add a Movie to WatchList 
$(".addMovie").on("click", function (event) {
  event.preventDefault();

  // Get it from the data-attribute 
  const movieTitle = $(this).data("movie-title");
  console.log(movieTitle);
  const moviePoster = $(this).data("movie-poster");
  console.log(moviePoster);
  const movieActors = $(this).data("movie-actors");
  console.log(movieActors);
  const movieReleased = $(this).data("movie-released");
  console.log(movieReleased);
  const movieRating = $(this).data("movie-imdbRating");
  console.log(movieRating);

  // Movie Object
  const movie = {
    Title: movieTitle,
    Poster: moviePoster,
    Actors: movieActors,
    Released: movieReleased,
    Rating: movieRating
  }
  console.log("Objects Working", movie);

  // Geting the data from the localstorage
  let watchListStored = JSON.parse(localStorage.getItem("movieList")) || [];

  //pushing the new movie into the watchlist arr
  watchListStored.push(movie)

  // Once gettin the data it will store the updated data to local storage 
  localStorage.setItem("movieList", JSON.stringify(watchListStored));
  alert("Movie has been Added to the WatchList");

});


//This is the WatchList button on the navbar for users to see whats added
//This will be focusing on WatchList for users
$("#watchlist-btn").on("click", function (event) {
  event.preventDefault();

  //Head to the watchlist
  window.location.href = "watchlist.html";
});





// $(document).ready(function () {
//   const storedMovies = localStorage.getItem("searchMovieName");
//   // Parse it and be stored in a array as a JSON
//   if (storedMovies !== null) {
//     const getMovies = JSON.parse(storedMovies) || [];

//     //show the movies in the watchlist page 
//     showWatchlist([getMovies]);
//   }
// });
