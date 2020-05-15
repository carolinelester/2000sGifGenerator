$(document).ready(function(){

    var celebs = ["Britney Spears", "Paris Hilton", "Nicole Richie", "Megan Fox", "Lindsay Lohan", "Christina Aguilera", "Gwen Stefani", "Mary Kate Olsen", "Ashley Olsen"];
    var results;
    
    // var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=FksXZxJtNgMhBh9yoAtA6sJfP13eNyd4";
    
    function makeButtons() {
    
        $("#2000-buttons").empty();
    
        for (i = 0; i < celebs.length; i++) {
            var b = $("<button>");
            b.addClass("celeb-btn");
            b.attr("data-name", celebs[i]);
            b.text(celebs[i]);
            $("#2000-buttons").append(b);
        }; //end loop
    }; //end makeButtons
    
    $("#add-celeb").on("click", function(event) {
        event.preventDefault();
        var celeb = $("#2000-input").val().trim();
        celebs.push(celeb);
        $("#2000-input").val("");
    
        makeButtons();
        console.log(celebs);
    }); //end on click function
    
        makeButtons(); // function works correctly
    
    function dataPull() {
    
        var celebName = $(this).attr("data-name");
        var celebStr = celebName.split(" ").join("+");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + celebStr + "&api_key=WzKjVN83UsQhoi9AJXAv3f85AndJLvOh";
    
        $.ajax({
        url: giphyURL,
        method: "GET"
        }).done(function(response) {
    
            console.log(giphyURL);
            console.log(response);
    
            results = response.data;
            $("#gifs").empty();
            for (var i = 0; i < 10; i++) {    
                var celebDiv = $("<div>");
                var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
                var celebImage = $("<img>");
    
                para.addClass("rating-text")
            
                celebImage.addClass("image-gifs")
                celebImage.attr("src", results[i].images.fixed_height_still.url);
                celebImage.attr("data-state", "still");
                celebImage.attr("data-position", i);
    
                celebDiv.append(para);
                celebDiv.append(celebImage);
                celebDiv.addClass("individual-gifs")
    
                 $("#gifs").prepend(celebDiv);
    
            }; //ENDS FOR LOOP
    
        }); // ENDS AJAX FUNCTION
    };
    
    $(document).on("click", ".celeb-btn", dataPull);
    
        // ANIMATE GIFS
    
    function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position"); //will return a string
        position = parseInt(position); //string to integer
    
        console.log(results[position].images.fixed_height.url);
        console.log(position);
    
        if (state === "still") {
            console.log("still");
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
          }
    };
    
      $(document).on("click", ".image-gifs", gifAnimation);
    
    }); //document.ready 
    