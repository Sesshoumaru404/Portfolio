function newStyle (number, item) {
  // Create div for search results
  var wrapper = document.createElement("DIV");
  wrapper.className = "entries";
  wrapper.setAttribute("href", "https://en.wikipedia.org/wiki/"+ encodeURIComponent(item.title));
  wrapper.innerHTML = '<span class="title">'+ item.title + '</span>' +
  '<span class="wordcount"> Page Word Count: ' + item.wordcount + '</span>' +
  '<p>'+ item.snippet + '</p>';
  return wrapper;
}

function formatResults (data,search, add) {
  // Loop thru search reults
  for(i =0; i < data.query.search.length; i++) {
    $('.results').append(newStyle(i, data.query.search[i]));
  }
  // Create more div if more results
  if (data.continue) {
    $('.moreResults').attr({
      start: data.continue.sroffset,
      text: search
    });
    $('.moreResults').show();
  }
}

function Wiki (argument) {
    this.more = function(button) {
      // Load more results
      var more = $(button);
      var start = more.attr('start');
      var text = more.attr('text');
      this.getSearch(text, start);
    };

    this.getSearch = function (search, moreResults) {
      // get search from wiki api
      var link = "https://en.wikipedia.org//w/api.php?action=query&list=search&format=json&srsearch=" + search;
      if (moreResults) { link = link + "&sroffset=" + moreResults;}
      $.ajax({
          url: link,
          type: 'GET',
          dataType: 'jsonp',
      }).done(function (data) {
          if (data.error) {
            $('.results').empty();
            $('.moreResults').hide();
            $('.error').text(data.error.info);
            $('.error').show();
            return false;
          }
          if (moreResults) {
            formatResults(data, search, false);
          } else {
          // New search empty div
            $('.results').empty();
            $('.error').hide();
            $('.moreResults').hide();
            $('.results').append("Total results: " + data.query.searchinfo.totalhits);
            formatResults(data, search);
          }
        }
      );
    };
}

$(document).ready(function(e) {
  var results = new Wiki();
  $('#random').click(function (e) {
    var link = "http://en.wikipedia.org/?curid=" +Math.floor(Math.random() * 1000000) + 1;
    window.location.href = link;
  });
  $('#wikisearch').keypress(function (e) {
    if (e.which == 13) {
      results.getSearch(this.value);
      return false;
    }
  });

  $('.moreResults').click(function () {
    results.more(this);
    return false;  
  });

  $('.results').on('click', '.entries', function () {
    // console.log(this, arguments);
    var link = $(this).attr('href');
    window.location.href = link;
  });

});
