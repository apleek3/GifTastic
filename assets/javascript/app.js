$(document).ready(function () {
    console.log("Ready!");//lets me know jQuery is G2G

    var astronomicalBodies = []; //global array to store the inputs

    function makeButtons() {

        $("#astronomyButtons").empty();

        // Looping through the array of astronomical bodies
        for (var i = 0; i < astronomicalBodies.length; i++) {
            var a = $("<button>"); // generates buttons for each astrobody in the array
            a.addClass("button"); // Adds a class
            a.addClass("btn"); //Makes bootstrap buttons
            a.addClass("btn-info"); //""
            a.attr("data-name", astronomicalBodies[i]);// Adding a data-attribute with a value of the movie at index i
            a.text(astronomicalBodies[i]); // Providing the button's text with a value of the movie at index i
            $("#astronomyButtons").append(a); // Adding the button to the HTML
        }
    }

    $("#addAstronomy").on("click", function (event) { // This function handles events where one button is clicked
        event.preventDefault();// Prevents the buttons default behavior when clicked
        var astronomy = $("#astronomy-input").val().trim(); // This line grabs the input from the textbox and trims out any extra space
        astronomicalBodies.push(astronomy); // Adding the movie from the textbox to our array
        makeButtons();// Calls makeButtons function
    });

    makeButtons();

    $(document).on("click", ".button", function () {
        
        $("#gifs").empty();

        // Grabbing and storing the data-astronomy property value from the button
        var astronomy = $(this).attr("data-name");

        // Constructing a queryURL using the astronomy name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            astronomy + "&api_key=dzRd4JQJhi8oMRInE0JuiDG5R4zD2Ls4";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < 10; i++) {

                    // Creating and storing a div tag
                    var astronomyDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var astronomyImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    astronomyImage.attr("src", results[i].images.fixed_height.url);
                    astronomyImage.addClass("astronomyGif");

                    // Appending the paragraph and image tag to the astronomyDiv
                    astronomyDiv.addClass("fluid-container");
                    astronomyDiv.append(p);
                    astronomyDiv.append(astronomyImage);

                    // Prependng the astronomyDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs").prepend(astronomyDiv);
                }
            });
    });

    $(document).on("click", ".astronomyGif", function () {
        var state = $(this).attr("data-state");        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        if (state === "still") {        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");     // Then, set the image's data-state to animate
        } else {        // Else set src to the data-still value
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


}); // ENDING BRACKET OF THE .ready function. DO NOT TOUCH!!!!

