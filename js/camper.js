var newStyle = function (item) {
  var wrapper = document.createElement("DIV");
  wrapper.className = "wrapper";
  wrapper.innerHTML = ''+
'  <div class="card"> '+
'    <div class="card__header"><img src="' + item.author.picture + '"></div> '+
'    <div class="card__image card__image"><i class="fa fa-thumbs-o-up"></i></div> '+
'    <div class="card__info"> '+
'      <div class="details"> '+
'        <span class="details__text-header">head line here</span> '+
'        <span class="details__text-subheader">' + item.author.username + '</span> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__number">25k</span> '+
'          <span class="details__text">followers</span> '+
'        </div> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__number">3</span> '+
'          <span class="details__text">following</span> '+
'        </div> '+
'      </div> '+
'      <div class="card__info__section-3"> '+
'        <div class="details-bottom"> '+
'          <span class="details__number">16k</span> '+
'          <span class="details__text">tweets</span> '+
'        </div> '+
'      </div> '+
'    </div> '+
'  </div>';
  return wrapper;
};

function News () {
  this.feed = "http://www.freecodecamp.com/news/hot";
  this.gotdata = [];
  this.getLastest = function () {
    $.ajax({
      // Check twitch for online users
        url: this.feed,
        type: 'GET',
        dataType: 'json',
    }).done(function (data) {
      var test = [];
      // $('.add').append(newStyle())
      for (var item in data) {
        $('.add').append(newStyle(data[item]));
      }
    }
      // body...
    );
  };
}

$(document).ready(function(e) {
  var text = new News();
  text.getLastest();
  console.log(News.gotdata);
});
