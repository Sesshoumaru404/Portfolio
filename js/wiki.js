function newStyle (number, item) {
  var wrapper = document.createElement("DIV");
  // wrapper.className = "entries";
  wrapper.className = "entries";
  wrapper.setAttribute("href", "https://en.wikipedia.org/wiki/"+ encodeURIComponent(item.title));
  wrapper.innerHTML = '<span class="title">'+ item.title + '</span>' +
  '<p>'+ item.snippet + '</p>';
  return wrapper;
}

function formatResults (data,search, add) {
  // console.log(data);
  // If results div empty
  if ($.trim( $('.results').text() ).length !== 0 && add) {
    $('.results').html('');
  }
  for(i =0; i < data.query.search.length; i++) {
    $('.results').append(newStyle(i, data.query.search[i]));
  }
  if (data.continue) {
    $('.moreResults').attr('start' , data.continue.sroffset);
    $('.moreResults').attr('text', search);
    $('.moreResults').show();
  }
}

function Wiki (argument) {
    this.test = function (argument) {
      console.log(argument);
    };

    this.more = function(button) {
      var more = $(button);
      var start = more.attr('start');
      var text = more.attr('text');
      this.getSearch(text, start);
    };

    this.getSearch = function (search, moreResults) {
      var link = "https://en.wikipedia.org//w/api.php?action=query&list=search&format=json&srsearch=" + search;
      if (moreResults) {
        link = link + "&sroffset=" + moreResults;
      }
      $.ajax({
          url: link,
          type: 'GET',
          dataType: 'jsonp',
      }).done(function (data) {
          if (moreResults) {
            formatResults(data, search, false);
          } else {
            formatResults(data, search);
          }
        }
      );
    };
}


$(document).ready(function(e) {
  var results = new Wiki();
  $('#wikisearch').keypress(function (e) {
    if (e.which == 13) {
      results.getSearch(this.value);
      return false;    //<---- Add this line
    }
  });

  $('.moreResults').click(function () {
    results.more(this);
  });

  $('.results').on('click', '.entries', function () {
    // console.log(this, arguments);
    var link = $(this).attr('href');
    window.location.href = link;
  });

});
