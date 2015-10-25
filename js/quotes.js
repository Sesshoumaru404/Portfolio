// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show();
} else {
  $('.js-geolocation').hide();
}

$(document).ready(function(e) {
  var oldquote;
  var newQuote;
  var max = quotes.length;
  var weatherlocation = "Atlanta"
  var woeid = ""
  var degree = "f"
  oldquote = Math.floor(Math.random() * (max - 0 + 1)) + 0;
  $(".quote").text(quotes[oldquote].quote)
  $(".author span").text(quotes[oldquote].author);
  // Click to show another quote
  $(".changeQuote").click(function (event) {
    event.stopImmediatePropagation()
    // Prevent repeated quotes
    do {
      newQuote = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    }
    while (newQuote == oldquote)

    // Load new Quote
    $(".quote").text(quotes[newQuote].quote)
    $(".author span").text(quotes[newQuote].author);
    oldquote = newQuote
  })


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      weatherlocation = position.coords.latitude;
      woeid = position.coords.longitude
      loadWeather(weatherlocation, woeid);
    });
  }

  loadWeather(weatherlocation, woeid);

  $(".changedegree").click(function (event) {
      degree = (degree != "f" ? "f" : "c");
      $.simpleWeather({
        location: weatherlocation,
        woeid: woeid,
        unit: degree,
        success: function(weather) {
          $("#weather").html(weather.temp+'&deg;'+weather.units.temp);
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
  })

});


function loadWeather(weatherlocation, woeid) {
  $.simpleWeather({
    location: weatherlocation,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      // Set weather info
      $("#weather").html(weather.temp+'&deg;'+weather.units.temp);
      $("#weatherCity").text(weather.city+', '+weather.region);
      $("#weatherCurrently").text(weather.currently);
      // Change text color based on temp
      if (68 > weather.temp){
        $(".quote").css("color", "blue");
        $(".label-default").css("background-color", "blue");
      } else if (weather.temp > 90) {
        $(".quote").css("color", "red");
        $(".label-default").css("background-color", "red");
      }
      console.log(weatherlocation, woeid );
      return weatherlocation, woeid;
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
