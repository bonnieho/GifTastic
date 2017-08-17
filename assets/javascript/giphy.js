/* var buttonsHTML = '';
var countryArray = ['Japan', 'China', 'Mongolia', 'North Korea', 'Vietnam', 'Thailand', 'Australia', 'India', 'Pakistan', 'Iran', 'Russia', 'Iraq', 'Saudi Arabia', 'Turkey', 'Greece', 'Italy', 'Spain', 'Egypt', 'Germany', 'France', 'England', 'Ireland'];
var newCountryValue;
var giphyKey = "dc6zaTOxFJmzC";
var searchCountry;
var giphyHolder;
var giphyArray = [];

function generateButtons() {
     for (var i = 0; i < countryArray.length; i++) {
          buttonsHTML += "<button class='btn btn-lrg btn-primary country-buttons' data-country=" + countryArray[i] + ">" + countryArray[i] + "</button>";
     }
     $('#country-buttons-container').html(buttonsHTML);
}


*/

    


        // Fool around with the GIPHY API. Giphy API.

        // Be sure to read about these GIPHY parameters (hint, hint):
        
           // api_key: string

            // q: string (Search query term or prhase)

            // limit: integer (int32) (The maximum number of records to return)

            // rating: string (Filters results by specified rating)


// GIPHY requires developers to use a key to access their API data. For now, you can use their public API key.
// Make sure you switch the protocol in the query URL from http to https, or the app may not work properly when deployed to Heroku.
        

        // var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + "&api_key=729fe4fba3f349c48227746df00511f7&limit=10");
        // xhr.done(function(data) { console.log("success got data", data); });


var searchShows
var giphyTank;
var giphyArray = [];

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
var topics = ['Gilligan\'s Island', 'Bewitched', 'I Dream of Jeannie', 'Addams Family', 'Green Acres', 'Hogan\'s Heroes'];

// Hit the GIPHY API.
// 729fe4fba3f349c48227746df00511f7
var giphyAPIKey = "729fe4fba3f349c48227746df00511f7";


    

    
// The form (#tv-form) takes the value from a user input box (#tv-show-input) and adds it into the topics array. 
// Then make a function call that takes each topic in the array remakes the buttons on the page.

// Taking the topics in this array and create buttons in your HTML.
    
// Function for displaying tv show data
function renderButtons() {

    // Deleting the (previously added) tv show buttons prior to adding new tv show buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of tv shows
    for (var i = 0; i < topics.length; i++) {

      // Then dynamically generate a button for each newly added tv show in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class to each new button
      a.addClass("tv-show");
      // Adding a data-attribute with a value of the show's name at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the show's name at index i
      a.text(topics[i]);
      // Now adding the newly generated button to the others in the #buttons-view div
      $("#buttons-view").append(a);  
    }
}



// This function handles the event when 1) the "Add a TV Show" button is clicked; and 2) the user hits enter after a show name is typed into the text field.
$("#add-show").on("click", function(event) {

    // We're using a form so that the user can hit enter instead of clicking the button if they want
    // event.preventDefault() prevents the form from trying to submit itself.

    event.preventDefault();

    // This line will grab the text from the input box
    var show = $("#tv-show-input").val().trim();

    // The tv show from the textbox is then added to our array
    topics.push(show);

    // calling renderButtons which handles the processing of our tv show ("topics") array
    renderButtons();

    // emptying out the text field after submission
    // FIRST TRY $("#tv-show-input").empty();
    
    // STILL NOT WORKING to clear the text field after new button created!!!
    $("#tv-show-input").blur(function() {
        this.value = '';
    });

    $("#tv-show-input").focus(function() {
        this.value = '';
    });
});


// Calling the renderButtons function at least once to display the initial list of tv shows
renderButtons();



// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// this was working
// $('body').on also worked

$(document).on('click', '.tv-show', function(event){
     $('#my-ten-gifs').empty();
     searchShows= $(this).attr('data-name');
     queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchShows + "&limit=10" +"&api_key=dc6zaTOxFJmzC";
     // console.log(queryURL);
     $.ajax({url: queryURL, method: 'GET'})
          .done(function(response) {
               // console.log(response.data);
               for (var i = 0; i < response.data.length; i++) {
                    // console.log(response.data[i]);

                    /*

                    // Creating a div with the class "show"
                    var gifDiv = $("<div class='show'>");
              
                    // Storing the result item's rating
                    var rating = response.rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Displaying the rating
                    showDiv.append(p);

                    // Creating an image tag
                    var showImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the result item
                    showImage.attr("src", topics[i].images.fixed_height.url);
              
                    gifDiv.append(showImage);
              
                    // Appending the paragraph and showImage we created to the "gifDiv" div we created
                    gifDiv.append(p);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#my-ten-gifs").prepend(gifDiv);

                    */

                    
                    $('#my-ten-gifs').append("<div class='outer-container'><span class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</span><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    giphyArray.push(response.data[i].images.downsized.url);
                    console.log(response.data[i]);
               }

               $(".images-returned").on("click", function() {
      
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    // var state = $(this).data("state");
                    var state = $(this).attr("data-state");
      
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                  
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

          });

});


/*


  <img src="http://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="http://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="http://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
  
  <script type="text/javascript">
   
    $(".gif").on("click", function() {
      
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      // var state = $(this).attr("data-state");
      var state = $(this).data("state");
      
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  </script>

  */

     


    


    // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    // Under every gif, display its rating (PG, G, so on).
      
        // Only once you get images displaying with button presses should you move on to the next step.


    
