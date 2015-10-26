$(document).ready(function (e) {
    "use strict";
    var minutes, interval, breakmins, totalseconds;
    var breakstart, pause = false;
    var seconds = 60, innerOffset = '690', outerOffset = '750', audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '../files/buzz.mp3');
    audioElement.addEventListener('ended', function () {this.currentTime = 0; }, false);

    function stopCount() {
//        Reset everything and stop timer
        clearInterval(interval);
        interval = minutes = undefined;
        breakstart = pause = false;
        seconds = 60;
        $(".click").text("Start");
        $('.timermode').text("Work");
        $('.clock').html("<span class='minute'>" + $(".timer").text() + "</span>:00");
    }

    function downcount() {
//        Countdown timer and circle animation
        seconds = seconds - 1;
        totalseconds = breakstart ? 0 : totalseconds - 1;
        if (seconds === 59) {
            minutes = minutes - 1;
        }
        seconds = (seconds < 10) ? '0' + seconds.toString() : seconds;
        if (seconds === 60) {
            $('.clock').text(minutes + ":00");
        } else {
            $('.clock').text(minutes + ":" + seconds);
        }
        // Cirlce animations
        $('.inner').css('stroke-dashoffset', 0 + (totalseconds * (innerOffset / 60)));
        $('.outer').css('stroke-dashoffset', outerOffset - (totalseconds * (outerOffset / (parseInt($('.timer').text(), 10) * 60))));
        if (seconds == 0) {
//            If minutes and seconds are zero start break or finish timer
            if (minutes === 0) {
                if (breakstart) {
                    audioElement.play();
                    return stopCount();
                } else {
                    audioElement.play();
                    breakstart = true;
                    $('.timermode').text("Break");
                    minutes = breakmins;
                    $('.clock').text(minutes + ":00");
                }
            }
            seconds = 60;
        }
    }

    $(".stop").click(function (e) {
        stopCount();
        return;
    });

    $(".addTime").click(function (e) {
        if (interval) {
            return;
        }
        var x = parseInt($(this).prev().text(), 10) + 1;
        $(this).prev().text(x);
        if ($(this).prev().hasClass("timer")) {
            $(".minute").text(x);
        }
    });

    $(".minusTime").click(function (e) {
        if (interval || parseInt($(this).next().text(), 10) === 1) {
            return;
        }
        var y = parseInt($(this).next().text(), 10) - 1;
        $(this).next().text(y);
        if ($(this).next().hasClass("timer")) {
            $(".minute").text(y);
        }
    });

    function countinterval() {
//        Timer interval function
        interval = setInterval(downcount, 1000);
    }

    $(".click").click(function (e) {
        pause = pause === false ? true : false;
        if (pause) {
            $(".click").text("Pause");
        } else {
            $(".click").text("Start");
            return clearInterval(interval);
        }
        breakmins = breakmins || parseInt($('.break').text(), 10);
        minutes = minutes || parseInt($('.clock').text(), 10);
        totalseconds = totalseconds || minutes * 60;
        countinterval();
    });
});
