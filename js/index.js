$(document).ready(function (e) {
    'use strict';

    var page = location.pathname.split("/");
    $('.is-active').removeClass('is-active');
    page = page[page.length -1].split(".")[0] || "index";
    $("#" + page).addClass('is-active');
});
