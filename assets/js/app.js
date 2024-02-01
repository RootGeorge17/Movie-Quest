console.log("App is working");

//global scope 
let queryUrl = '';

//Searching for a Movies
$("#search-button").on("click", function (event) {
 event.preventDefault();
 //Api Key 
 const apiKey = "AIzaSyCPh_nvXp0kulhY-W1zMJ1jpQBQ2sIsoew";

 //Getting the movie from the search bar adding it in the API
 searchMovieTrailer = $("#search-button").val().trim();
 // searchMovieTrailer = "  ";

 console.log("Movie Trailer Name:", searchMovieTrailer);

 // if a movie is not provided it will avoids the api call to go ahead 
 // if (!searchMovieTrailer.trim()) {
 //  console.log("A Movie is not provided");
 //  return;
 // }

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

 //displaying the video in the webpage by using iframes 
 const youtubeSrc = `www.youtube.com/embed/${video}`;
 const iframeEl = `<iframe id="player" type="text/html" width="640" height="390" src="${youtubeSrc}" frameborder="0"></frame>`;
 console.log(`Iframe : ${iframeEl}`);

 //Append the youtube video to the webpage
 $(".movieContainer").html(iframeEl);

}

