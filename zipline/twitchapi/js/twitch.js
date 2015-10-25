$(document).ready(function (e) {
    'use strict';
    var steamer = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "noobs2ninjas", "ieeeurjcsb", "skypython", "medrybw"],
        steamerdiv = $('.steamers'),
        steamerlist = $('.steamers_list'),
        test = "https://api.twitch.tv/kraken/streams?game=programming&channel=" + steamer.join(),
        streamersUrl = "https://api.twitch.tv/kraken/streams?channel=" + steamer.join(),
        searcharr = [];
    function offline(argument) {
        searcharr.push(argument);
        return "<div class='offline "+argument+ "'><a href='http://www.twitch.tv/" + argument + "'><div class='streams'><img src='./img/" + argument +
            ".jpeg' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
            argument + "<span class='glyphicon glyphicon-remove-sign'><span></div></a></div>";
    }
    function online(argument) {
        searcharr.push(argument.channel.display_name.toLowerCase());
        return "<div class='online "+argument.channel.display_name.toLowerCase() +"'><a href='" + argument.channel.url +
            "'><div class='streams '><img src='" + argument.channel.logo +
            "' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
            argument.channel.display_name +"</br><span class='startTime'>Stream started " + moment(argument.channel.created_at).fromNow() +
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
        url: streamersUrl,
        type: 'GET',
        dataType: 'jsonp',
        // async: false,
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
      var text =   $('.form-control').val();
      if (!$('.streamtable th').first().hasClass('active')) {
        $('.steamers_list div').show();
        $('.info').hide();
        $('.streamtable th').removeClass('active');
        $('.streamtable th').first().addClass('active');
      }
      if (text.length >= 1) {
        $( ".steamers_list" ).children().hide();
        searcharr.forEach(function (value){
          if (value.match(text)) {
            $( ".steamers_list" ).find( '.' + value ).show();
          }
        });
      } else {
        $( ".steamers_list" ).children().show();
      }
    });


    $(".streamtable").on("click", ".streamexpand" ,function (e) {
        e.preventDefault();
        if ($(this).next().css('display') === 'none'){
          $('.info').hide();
          $(this).next().show();
        } else {
          $(this).next().hide();
        }
    });
});
