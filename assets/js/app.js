console.log("App is working");

//global scope 
let queryUrl = '';

//Searching for a Movies
$("#search-button").on("click", function (event) {
  event.preventDefault();

  //Api Key 
  const apiKey = "AIzaSyCPh_nvXp0kulhY-W1zMJ1jpQBQ2sIsoew";

  //Getting the movie from the search bar adding it in the API
  searchMovieTrailer = $("#search-input").val().trim();
  // searchMovieTrailer = "  ";

  console.log("Movie Trailer Name:", searchMovieTrailer);

  //if a user search is empty an alert will be displayed
  if (searchMovieTrailer === "") {
    const alertTime = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Attention! Please enter a movie!</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    $("#alert-container").append(alertTime);
    console.log(searchMovieTrailer);
    return;
  }



  //url
  queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchMovieTrailer)}&type=video&videoType=movie&key=${apiKey}`;
  console.log(`"API URL, ${queryUrl}`);

  //Fetching the API Call 
  fetch(queryUrl)
    .then(function (response) {
      return response.json(); //This process is waiting for the response and parsing it into JSON format
    })
    .then(function (results) {
      console.log(results);
      addMovieTrailer(results);
    })
    .catch(function (error) {
      console.error(`Error Occurred when Fetching the Youtube API ${error}`);    //handling if an error occurs when fetching 
    });
});

// function to display the video
function addMovieTrailer(data) {

  const video = data.items[0].id.videoId;
  console.log(`Video ID for the Video displayed : ${video}`);

  //displaying the video in the webpage by using iframes and will be muted once its play 
  const youtubeSrc = `https://www.youtube.com/embed/${video}`;
  const iframeEl = `<iframe id="player" type="text/html" src="${youtubeSrc}" frameborder="0"></frame>`;



  console.log(`Iframe : ${iframeEl}`);

  //Append the youtube video to the webpage
  $(".movieContainer").html(iframeEl);

}

