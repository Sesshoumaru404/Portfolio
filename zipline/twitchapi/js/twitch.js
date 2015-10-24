$(document).ready(function (e) {
    'use strict';
    var steamer = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "noobs2ninjas", "ieeeurjcsb", "skypython", "medrybw"],
        steamerdiv = $('.steamers'),
        steamerlist = $('.steamers_list'),
        test = "https://api.twitch.tv/kraken/streams?game=programming&channel=" + steamer.join(),
        streamersUrl = "https://api.twitch.tv/kraken/streams?channel=" + steamer.join();
    function offline(argument) {
        return "<div class='offine'><a href='http://www.twitch.tv/" + argument + "'><div class='streams'><img src='./img/" + argument +
            ".jpeg' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
            argument + "<span class='glyphicon glyphicon-remove-circle'><span></div></a></div>";
    }
    function online(argument) {
        return "<div class='online'><a href='" + argument.channel.url + "'><div class='streams'><img src='" + argument.channel.logo +
            "' alt='140x140' class='img-circle' style='width: 30px; height: 30px;''>" +
            argument.channel.display_name +"</br><span class='startTime'>Up time: " + moment(argument.channel.created_at).fromNow()
            + "</span></div></a><div class='streamexpand'><span class='glyphicon glyphicon-option-horizontal'><span></div></div>";
    }
    $.ajax({
        url: streamersUrl,
        type: 'GET',
        dataType: 'jsonp',
        // async: false,
        success: function (data) {
            console.log(data);
            $.each(data.streams, function (key) {
                var name = data.streams[key].channel.display_name.toLowerCase(),
                    number = steamer.indexOf(name);
                // console.log(number );
                if (number !== -1) {
                    steamer.splice(number, 1, data.streams[key]);
                    console.log(data.streams[key]);
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
    $(".streams.online span").click(function (e){
        e.preventDefault()
    })
});
