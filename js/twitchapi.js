var searcharr = [];

function offline(streamer) {
  // Set default logo is not present
    var logo = (streamer.logo) ? streamer.logo : "https://raw.githubusercontent.com/Sesshoumaru404/portfolio/gh-pages/files/default.jpeg";
    // Create an offline td for table and add to array
    searcharr.push(streamer.display_name);
    return "<div class='offline "+streamer.display_name+ "'><a href='http://www.twitch.tv/" + streamer.display_name + "'><div class='streams'><img src='"+ logo +"' alt='140x140' class='img-circle' style='width: 30px; height: 30px;'><span class='title'>" +
        streamer.display_name + "</span><span class='glyphicon glyphicon-remove-sign'><span></div></a></div>";
}
function online(argument) {
    // Create an Online td for table and add to array
    searcharr.push(argument.stream.channel.display_name.toLowerCase());
    return "<div class='online "+argument.stream.channel.display_name.toLowerCase() +"'><a href='" + argument.stream.channel.url +
        "'><div class='streams '><img src='" + argument.stream.channel.logo +
        "' alt='140x140' class='img-circle' style='width: 30px; height: 30px;'><span class='title'>" +
        argument.stream.channel.display_name.toLowerCase() +"</span></br><span class='startTime'>Stream started " + moment(argument.stream.channel.created_at).fromNow() +
        "</span></div></a><div class='streamexpand'><span class='glyphicon glyphicon-info-sign'><span></div>"+
        "<div class='info well'>"+
          "Status: "+ argument.stream.channel.status + "</a></br>"+
          "Game: <a href='http://www.twitch.tv/directory/game/"+ argument.game +"'> " + argument.game + "</a></br>"+
          "Viewers: "+ argument.viewers + "</a></br>"+
          "Views: "+ argument.stream.channel.views + "</a></br>"+
          "Language: "+ argument.stream.channel.language.toUpperCase() + "</a></br>"+
        "</div></div>";
}

function StreamerList() {
  this.people = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "noobs2ninjas", "ieeeurjcsb", "skypython", "medrybw"];
  this.geturl = "https://api.twitch.tv/kraken/streams/";
  this.getList = function (){
    var person = 0, len = this.people.length;
    for(person; person < len; person++){
      var x = this.people[person];
      $.ajax({
        url: this.geturl + x,
        async: false,
        dataType: 'jsonp',
        success:function(data){
          if (data.stream) {
            $('.steamers_list').append(online(data));
          } else {
            $.get(data._links.channel, function(data) {
              $('.steamers_list').append(offline(data));
            });
          }
        }
      });
    }
  };
}

$(document).ready(function (e) {
    'use strict';
    var list = new StreamerList();
    list.getList();

    $(".streamtable").on('click', 'th' , function (){
      // Highlight active table header
      if (!$(this).hasClass('active')){
        $('.streamtable th').removeClass('active');
        $(this).addClass('active');
        switch ($(this).text().trim()) {
          case "All":
            $('.steamers_list div').show();
            $('.info').hide();
            break;
          case "Online":
            $('.offline').hide();
            $('.online').show();
            $('.info').hide();
            break;
          case "Offline":
            $('.online').hide();
            $('.offline').show();
            break;
        }
      }
    });

    $('.form-control').keyup(function (event) {
      // On keyboard keyup search list of users and highlight search letters.
      var text = $('.form-control').val();
      var search = new RegExp( text,"i");
      if (!$('.streamtable th').first().hasClass('active')) {
        $('.steamers_list div').show();
        $('.info').hide();
        $('.streamtable th').removeClass('active');
        $('.streamtable th').first().addClass('active');
      }
      $( ".steamers_list" ).children().hide();
      searcharr.forEach(function (value){
        var index = value.search(search);
        if (index != -1) {
          var title  = $( ".steamers_list ."+ value +" .title" ).text();
          var replaceText = title.substr(index, text.length);
          $( ".steamers_list ."+ value +"" ).show();
          title = title.replace(replaceText, replaceText.fontcolor('0ef319'));
          $( ".steamers_list ."+ value +" .title" ).html(title);
        } else {
          return;
        }
      });
    });

    $(".streamtable").on("click", ".streamexpand" ,function (e) {
      // Expand info for online users.
        e.preventDefault();
        if ($(this).next().css('display') === 'none'){
          $('.info').hide();
          $(this).next().show();
        } else {
          $(this).next().hide();
        }
    });
});
