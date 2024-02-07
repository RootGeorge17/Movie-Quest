var watchListStored= [];

$("#search-button").on("click", function (event) {
  event.preventDefault();

  //Api Key 
  const apiKey = "AIzaSyB7_wPfd2E3WCflXd_mQD5GX_7_4iZhFZg";

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

  // to have a maxium of 5 cards show in the watchlist
  // const maxMovieShow = 5;
  // const maxMovies = getMovies.slice(0, maxMovieShow)

  // Iterate over getMovies
  // maxMovies.forEach(function (movie) {

  //   // add the image for the video 
  //   const posterImage = $("<img>");
  //   posterImage.attr("src", movie.Poster); // Setting the src attribute from movie.Poster
  //   $(".watchlist-container").append(posterImage);

  //   //creating the movie card 
  //   const movieCard = `
  //         <div>
  //           <h1 class="card-title">${movie.Title}</h1>
  //           <h3 class="card-title">${movie.Actors}</h3>
  //           <h3 class="card-title">${movie.Released}</h3>
  //           <h3 class="card-title">${movie.imdbRating}</h3>
  //         </div>`;

  //   //adding it in the watchlist container 
  //   $(".watchlist-container").append(movieCard);

  // });
}

//clear btn 
$("#Clear").on("click", function (event) {
  event.preventDefault();
console.log('test')
  //remove storage
  localStorage.removeItem("searchMovieName");

  // clear the container 
  $(".watchlist-container").empty()
});

$(document).ready(function () {
  $(".current-movie").on("click", ".addMovie", function (event) {
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
    const movieRating = $(this).data("movie-imdb-rating");
    console.log(movieRating);

    // Movie Object
    const movie = {
      Title: movieTitle,
      Poster: moviePoster,
      Actors: movieActors,
      Released: movieReleased,
      Rating: movieRating
    }

    // Getting the data from the local storage
    let watchListStored = JSON.parse(localStorage.getItem("movieList")) || [];

    // Pushing the new movie into the watchlist array
    watchListStored.push(movie)

    // Once getting the data it will store the updated data to local storage 
    localStorage.setItem("movieList", JSON.stringify(watchListStored));
    $("#alert-success").fadeIn();

    setTimeout(function () {
      $("#alert-success").fadeOut();
    }, 3000);
  });
});

//This is the WatchList button on the navbar for users to see whats added
//This will be focusing on WatchList for users
$("#watchlist-link").on("click", function (event) {
  event.preventDefault();

  console.log([localStorage.getItem("movieList")]);
  showWatchlist([localStorage.getItem("movieList")]);
  

  //Head to the watchlist
  window.location.href = "watchlist.html";
});




let savedMovies = JSON.parse(localStorage.getItem("movieList")) || [];
  console.log(savedMovies);

let textTest = $('.watchlist-container');
for (let i = 0; i < savedMovies.length; i++) {
  let value = savedMovies[i]
  console.log(value)
 console.log(value.Title)
  const posterImage = $("<img>");

  // posterImage.attr("src", data.Poster); // Setting the src attribute from movie.Poster
  $(".watchlist-container").append(posterImage);

  //creating the movie card 
  const movieCard = `
        <div>
          <h1 class="card-title">${value.Title}</h1>
          <h3 class="card-title">${value.Actors}</h3>
          <h3 class="card-title">${value.Released}</h3>
          <h3 class="card-title">${value.Rating}</h3>
        </div>`;
// console.log(movieCard)
//   //adding it in the watchlist container 
  $(".watchlist-container").append(movieCard);
//   console.log(value)
// textTest.text(value);
  // console.log(watchListStored)
  // console.log(savedMovies)
  
}
 

  
