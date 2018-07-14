$(document).ready(function () {
    console.log("Ready!");//lets me know jQuery is G2G

    var astronomicalBodies = ["star","planet","comet","quasar","pulsar"]; //global array to store the inputs

    function makeButtons() {

        $("#astronomyButtons").empty();

        // Looping through the array of astronomical bodies
        for (var i = 0; i < astronomicalBodies.length; i++) {
            var a = $("<button>"); // generates buttons for each astrobody in the array
            a.addClass("button"); // Adds a class
            a.addClass("btn"); //Makes bootstrap buttons type
            a.addClass("btn-info"); //"Makes bootstrap buttons style"
            a.attr("data-name", astronomicalBodies[i]);// Adding a data-attribute with a value of the movie at index i
            a.text(astronomicalBodies[i]); // Providing the button's text with a value of the movie at index i
            a.css({ "margin": "10px" }); //creates some space between the buttons
            $("#astronomyButtons").append(a); // Adding the button to the HTML

        }
    }

    $("#astronomy-input").css({ "width": "25%", "height": "10px", "margin": "0px" });

    $("#addAstronomy").on("click", function (event) { // This function handles events where one button is clicked
        event.preventDefault();// Prevents the buttons default behavior when clicked
        var astronomy = $("#astronomy-input").val().trim(); // This line grabs the input from the textbox and trims out any extra space
        astronomicalBodies.push(astronomy); // Adding the movie from the textbox to our array
        makeButtons();// Calls makeButtons function
    });

    makeButtons();
    $(document).on('click', '.astronomyGif', function () {           //targets the gifs created with class astronomyGif

        var source = $(this).attr("src");                           //creates source variable representing the gifs current info path for if / else statement
        //FIRST CLICK will assign the class 'animate' according to function
        if ($(this).hasClass('animate')) {
            $(this).removeClass('animate'); 
            $(this).addClass('still');                           //removes the class animate so the image can be fed through the if/else again properly
            $(this).attr('src', source.replace(/\.gif/gi, "_s.gif"))    //replaces a snippet in the source specified as \.gif with _s.gif. The "gi" denotes the "global ignore" case flag; which means "globally ignore any code snippet I have specified." Regular "i" did not work for all gifs.
        } else {
            $(this).removeClass('still');
            $(this).addClass('animate'); //adds the class 'animate'
            $(this).attr('src', source.replace(/\_s\.gif/gi, ".gif")) //replaces a snippet in the source specified as \_s.gif with .gif.
        
        } // end of if
        
    });

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
                astronomyImage.addClass("animate");

                // Appending the paragraph and image tag to the astronomyDiv
                astronomyDiv.addClass("fluid-container");
                astronomyDiv.append(p);
                astronomyDiv.append(astronomyImage);

                // Prependng the astronomyDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs").prepend(astronomyDiv);

            } // end of for

        }); // end of ajax 

    }); // end of button click to load all the images

}); // ENDING BRACKET OF THE .ready function. DO NOT TOUCH!!!!

