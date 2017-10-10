// GifTastic! - Classic Television 
// This ia a class assignment created using Javascript and jQuery
// Author: Bonnie L. Hoffman - bonnieho@rice.edu

// This is an exercise in successfully using an API key to GET data from an external site and then - using specific attributes of the objects returned - render (as with the rating) or manipulate (as with the animate or static data state) those resulting objects (animated gifs).




// all contained within document ready function to allow all scripts to run ONLY after the document is loaded completely

$(document).ready(function(){


    // =============================================================
    
    // SECTION - global variables

    var searchShows
    var giphyArray = [];

    // Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
    var topics = ['Gilligan\'s Island', 'Bewitched', 'I Dream of Jeannie', 'Addams Family', 'Green Acres', 'Hogan\'s Heroes'];

    // Hit the GIPHY API.
    // 729fe4fba3f349c48227746df00511f7
    var giphyAPIKey = "729fe4fba3f349c48227746df00511f7";

        
    // =================================================================
  


    // The form (#tv-form) takes the value from a user input box (#tv-show-input) and adds it into the topics array. 
    // Then make a function call that takes each topic in the array remakes the buttons on the page.

    // Taking the topics in this array and creating buttons in the HTML.
        
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
          a.addClass("tv-show btn-primary");
          // Adding a data-attribute with a value of the show's name at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the show's name at index i
          a.text(topics[i]);
          // Now adding the newly generated button to the others in the #buttons-view div
          $("#buttons-view").append(a);  
        }
    }


    // start out with an empty text field
    $('#tv-show-input').val("");



    // =================================================================


    // This function handles the event when 1) the "Add a TV Show" button is clicked; and 2) the user hits enter after a show name is typed into the text field.
    $("#add-show").on("click", function(event) {

        // We're using a form so that the user can hit enter instead of clicking the button if they want
        // event.preventDefault() prevents the form from trying to submit itself.

        event.preventDefault();

        // This line will grab the text from the input box
        var show = $("#tv-show-input").val().trim();

        // The tv show from the textbox is then added to our array
        topics.push(show);
        console.log(topics);

        // calling renderButtons which handles the processing of our tv show ("topics") array
        renderButtons();

        // emptying out the text field after submission
        $('#tv-show-input').val("");
        
    });


    // Calling the renderButtons function at least once to display the initial list of tv shows
    renderButtons();



    // =================================================================


    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page in the #my-ten-gifs DIV.

    // $('body').on also worked

    $(document).on('click', '.tv-show', function(event){
         $('#my-ten-gifs').empty();
         // put a line here with the ratings legend
         $('#my-ten-gifs').append('<p><span class="lightgreen">Y - illustrated, cartoons</span>&#160;&#160;&#160;|&#160;&#160;&#160;<span class="lime">G - general audience</span>&#160;&#160;&#160;|&#160;&#160;&#160;<span class="magenta">PG - parental guidance suggested</span> &#160;&#160;&#160;|&#160;&#160;&#160;<span class="orange">PG-13 - parents strongly cautioned</span> &#160;&#160;&#160;|&#160;&#160;&#160;<span class="purple">R - restricted</span> &#160;&#160;&#160;|&#160;&#160;&#160;<span class="red">NC-17 - 18 and older only</span></p>');
         searchShows= $(this).attr('data-name');
         queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchShows + "&limit=10" +"&api_key=dc6zaTOxFJmzC";
         // console.log(queryURL);
         $.ajax({url: queryURL, method: 'GET'})
              .done(function(response) {
                    var listContainer = document.getElementById('my-ten-gifs');
                    
                    console.log(listContainer);
                    
                    for (var i = 0; i < response.data.length; i++) {
                        // console.log(response.data[i]);

                        var formattedRating = response.data[i].rating.toUpperCase();
                        
                        $('#my-ten-gifs').append("<div class='outer-container'><span class='title'>Rating: "+ formattedRating +"</span><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                        giphyArray.push(response.data[i].images.downsized.url);
                        // console.log(response.data[i]);
                        console.log(response.data[i].rating);


                    // END for loop that creates outer-container divs holding ratings and images
                   }


                   var ratingsContainers = listContainer.querySelectorAll('.outer-container');
                    
                    for (var i = 0; i < response.data.length; i++) {
                        var ratingColor = "blue";
            
                        if(response.data[i].rating==="y"){
                            ratingColor = 'lightgreen';
                        }
                        else if(response.data[i].rating==="g"){
                            ratingColor = 'lime';
                        }
                        else if(response.data[i].rating==="pg"){
                            ratingColor = 'magenta';
                        }
                        else if(response.data[i].rating==="pg-13"){
                            ratingColor = 'orange';
                        }
                        else if(response.data[i].rating==="r"){
                            ratingColor = 'purple';
                        }
                        else if (response.data[i].rating==="nc-17"){
                            ratingColor = 'red';
                        }
                        ratingsContainers[i].style.color = ratingColor;
                     }



                   $(".images-returned").on("click", function() {
          
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                        // var state = $(this).data("state");
                        var state = $(this).attr("data-state");
          
                        // IF the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // ELSE set src to the data-still value
                      
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    
                    // END data state toggle function (from still to animated)
                    });
            
            //END ajax call
            });
    
    // END button clicking function that populates #my-ten-gifs DIV with images
    });

// END document.ready   
}); 



     




    
