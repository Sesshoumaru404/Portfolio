$(document).ready(function (e) {
  var steamer = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","robotcaleb","noobs2ninjas","ieeeurjcsb","skypython", "medrybw"];
  var steamerdiv = $('.steamers');
  var steamerlist = $('.steamers_list');
  var test = "https://api.twitch.tv/kraken/streams?game=programming&channel=" + steamer.join();
  var streamersUrl = "https://api.twitch.tv/kraken/streams?channel=" + steamer.join();
  $.ajax({
      url: streamersUrl,
      type: 'GET',
      dataType: 'jsonp',
      // async: false,
      success: function(data) {
        console.log(data);
        $.each( data.streams, function( key ) {
            var name = data.streams[key].channel.display_name.toLowerCase();
            var number = steamer.indexOf(name);
            // console.log(number );
            if (number != -1){
              steamer.splice(number,1, data.streams[key]);
              console.log(data.streams[key]);
            }
        });
        $.each( steamer, function( key, value ) {
          if (typeof value === "string"){
            steamerlist.append(offline(value));
          }else {
            steamerlist.append(online(value));
          }
        });

      }
  });
  function offline(argument) {
    return "<a href='http://www.twitch.tv/"+argument+"'><div class='streams offline'><img src='./img/"+ argument +
    ".jpeg' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
    argument + "<span class='glyphicon glyphicon-remove-circle'><span></div></a>";
  }
  function online(argument) {
    return "<a href='"+argument.channel.url+"'><div class='streams online'><img src='"+ argument.channel.logo +
    "' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
    argument.channel.display_name + "<span class='glyphicon glyphicon-option-horizontal'><span></div></a>";
  }
  console.log(steamer);
  // steamer.splice(1,1, "testinf");
  // console.log(steamer);
  // $.ajax({
  //   async: false,
  //   method: 'GET',
  //   url: streamersUrl,
  //   dataType : 'jsonp'
  // }).done(function (data){
  //   console.log(data.streams);
  //   testing = data;
  // });
  // console.log(test2);
  // get( url [, data ] [, success ] [, dataType ] )
  // $.ajax({
  //   method: 'GET',
  //   url: streamersUrl,
  //   // headers : {
  //   //   "Accept": 'application/vnd.twitchtv.v3+json',
  //   //   'Access-Control-Allow-Origin' : 'http://api.twitch.tv'
  //   // },
  // }).done(function(data){
  //   console.log(data);
  //   for (var i in data.streams) {
  //     steamerlist.append("<li><a href="+data.streams[i].channel.url+">"+data.streams[i].channel.display_name+"</a></li>");
  //     // console.log(data.featured[i]);
  //   }
  // } );



  // console.log(steamerdiv);
});
