var newStyle = function (data) {
  var btn = document.createElement("BUTTON");        // Create a <button> element
  var t = document.createTextNode("CLICK ME");       // Create a text node
  btn.appendChild(t);                                // Append the text to <button>
  document.body.appendChild(btn);                    // Append <button> to <body>


}

function News () {
  this.feed = "http://www.freecodecamp.com/news/hot";
  this.getLastest = function () {
    $.ajax({
      // Check twitch for online users
        url: this.feed,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          for (item in data) {
            newStyle(data[item])
          }
        }
    });
  }
}

$(document).ready(function(e) {
  var text = new News();
  text.getLastest();
});
