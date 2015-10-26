$(document).ready(function (e) {
    "use strict";
    var hasDecimal = false, // Check if number has a decimal.
        restart = false, // Reset after clicking equals.
        clear = true, // Clear input field.
        input = $('.input'), // Input display.
        operater, a, b, answer;

    function clearAll() {
        hasDecimal = false;
        operater = a = b = answer = null;
        $(".beforeOp").text('');
        $(".afterOp").text('');
        $(".Op").text('');
        $(".equalsTo").text('');
        input.text('');
    }

    function doMath(first, second) {
        // Preform a math equation base on an operater
        a = parseFloat(first, 10);
        b = parseFloat(second, 10);
        switch (operater) {
        case "plus":
            answer = a + b;
            break;
        case "minus":
            answer = a - b;
            break;
        case "times":
            answer = a * b;
            break;
        case "divide":
            answer = a / b;
            break;
        }
    }

    $(".allclear").click(function () { clearAll(); });

    $('.clearLast').click(function () { $(".input").text(''); });


    $(".operator").click(function () {
        var op = $(this).text();
        if (restart) {
          restart = false;          
        }
        if (parseFloat(input.text().length) === 0 || parseFloat(input.text()) === answer) {
            // Check if input or displays answer, then change sign
            operater = $(this).attr('value');
            $(".Op").text(op);
            return;
        }
        if ((!b && a && parseFloat(input.text().length) === 0) || parseFloat(input.text()) === answer) { return; }
        if (operater) {
//            If sign is present calucate answer
            doMath(a, input.text());
            $(".beforeOp").text(answer);
            $(".Op").text(op);
            operater = $(this).attr('value');
            input.text(answer);
            a = answer;
            b = null;
            clear = true;
            return;
        }
        a = input.text();
        $(".beforeOp").text(a);
        $(".Op").text(op);
        operater = $(this).attr('value');
        input.text('');
    });

    $(".backspace").click(function () {
        if (parseFloat(input.text()) === answer) { return; }
        input.text(input.text().slice(0, -1));
    });
    $(".numbers").click(function () {
        if (restart) {
//            Reset after equals is clicked.
            clearAll();
            restart = false;
        }
        if (clear) {
//            Clear input after a sign is clicked
            input.text('');
            clear = false;
        }
        var currentinput = input.text();
        if (input.text().length > 18) { return; }
        currentinput = currentinput += $(this).text();
        $(".input").text(currentinput);
    });

    $(".equals").click(function () {
//        When equals is clicked calulate and clear
        if (input.text() == answer) { return; }
        b = $(".input").text();
        $(".afterOp").text(b);
        doMath(a, b);
//        If big number change format
        answer = (answer > 999999999999999999) ? parseFloat(answer).toPrecision(12) : answer;
        $(".equalsTo").text(answer);
        $(".input").text(answer);
        restart = true;
        hasDecimal = false;
        operater = a = b = answer = null;
    });

    $(".dot").click(function () {
        if (hasDecimal) { return; }
        if (parseFloat($(".input").text().length) === 0) { $(".input").text(0.); }
        var input = $(".input").text();
        input += $(this).text();
        $(".input").text(input);
        hasDecimal = true;
    });
});
