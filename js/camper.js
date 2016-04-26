var newStyle = function (item) {
  var wrapper = document.createElement("DIV");
  wrapper.className = "wrapper";
  wrapper.innerHTML = ''+
'  <div class="col-md-6"><div class="card"> '+
'    <div class="card__header"><img src="' + item.author.picture + '"></div> '+
'    <div class="card__image card__image"><i class="fa fa-thumbs-o-up"></i></div> '+
'    <div class="card__info"> '+
'      <div class="details">'+
'        <a href="' + item.link + '"><span class="details__text-header">'+ item.headline +'</span></a> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__text">Rank</span> '+
'          <span class="details__number">' + item.rank + '</span> '+
'        </div> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__text">Posted</span> '+
'          <span class="details__number">' + moment(item.timePosted).format('LL') + '</span> '+
'        </div> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__text">Poster</span> '+
'          <span class="details__number"><a href="http://www.freecodecamp.com/' + item.author.username + '">' + item.author.username + '</a></span> '+
'        </div> '+
'      </div> '+
'    </div> '+
'  </div></div>';
  return wrapper;
};

function News () {
  this.feed = "http://www.freecodecamp.com/news/hot";
  this.getLastest = function () {
    $.ajax({
        type: 'GET',
        url: this.feed,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: 'json'
    }).done(function (data) {
        for (var item in data) {
          $('.feeds').append(newStyle(data[item]));
        }
      }
    );
  };
}

$(document).ready(function(e) {
  var text = new News();
  text.getLastest();
});
