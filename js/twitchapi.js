$(document).ready(function (e) {
    'use strict';
    var steamer = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "noobs2ninjas", "ieeeurjcsb", "skypython", "medrybw"],
        steamerdiv = $('.steamers'), steamerlist = $('.steamers_list'), searcharr = [],
        test = "https://api.twitch.tv/kraken/streams?game=programming&channel=" + steamer.join(),
        streamersUrl = "https://api.twitch.tv/kraken/streams?channel=" + steamer.join();

    function offline(argument) {
        // Create an offline td for table and add to array
        searcharr.push(argument);
        return "<div class='offline "+argument+ "'><a href='http://www.twitch.tv/" + argument + "'><div class='streams'><img src='../files/" + argument +
            ".jpeg' alt='140x140' class='img-circle' style='width: 30px; height: 30px;'><span class='title'>" +
            argument + "</span><span class='glyphicon glyphicon-remove-sign'><span></div></a></div>";
    }
    function online(argument) {
        // Create an Online td for table and add to array
        searcharr.push(argument.channel.display_name.toLowerCase());
        return "<div class='online "+argument.channel.display_name.toLowerCase() +"'><a href='" + argument.channel.url +
            "'><div class='streams '><img src='" + argument.channel.logo +
            "' alt='140x140' class='img-circle' style='width: 30px; height: 30px;'><span class='title'>" +
            argument.channel.display_name.toLowerCase() +"</span></br><span class='startTime'>Stream started " + moment(argument.channel.created_at).fromNow() +
            "</span></div></a><div class='streamexpand'><span class='glyphicon glyphicon-info-sign'><span></div>"+
            "<div class='info well'>"+
              "Status: "+ argument.channel.status + "</a></br>"+
              "Game: <a href='http://www.twitch.tv/directory/game/"+ argument.game +"'> " + argument.game + "</a></br>"+
              "Viewers: "+ argument.viewers + "</a></br>"+
              "Views: "+ argument.channel.views + "</a></br>"+
              "Language: "+ argument.channel.language.toUpperCase() + "</a></br>"+
            "</div></div>";
    }
    $.ajax({
      // Check twitch for online users
        url: streamersUrl,
        type: 'GET',
        dataType: 'jsonp',
        async: false,
        success: function (data) {
            $.each(data.streams, function (key) {
                var name = data.streams[key].channel.display_name.toLowerCase(),
                    number = steamer.indexOf(name);
                if (number !== -1) {
                    steamer.splice(number, 1, data.streams[key]);
                }
            });
            $.each(steamer, function (key, value) {
                if (typeof value === "string") {
                    steamerlist.append(offline(value));
                } else {
                    steamerlist.append(online(value));
                }
            });
        }
    });

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
      var text =   $('.form-control').val();
      if (!$('.streamtable th').first().hasClass('active')) {
        $('.steamers_list div').show();
        $('.info').hide();
        $('.streamtable th').removeClass('active');
        $('.streamtable th').first().addClass('active');
      }
      $( ".steamers_list" ).children().hide();
      searcharr.forEach(function (value){
        if (value.match(text)) {
          var title  = $( ".steamers_list ."+ value +" .title" ).text();
          var search = new RegExp( text, 'i');
          $( ".steamers_list ."+ value +"" ).show();
          title = title.replace(search, text.bold().fontcolor('0ef319'));
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
