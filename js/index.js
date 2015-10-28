$(document).ready(function (e) {
    'use strict';
    $('.project_img').hover(
        function() {
            $(this).children('.img_caption').slideDown(250);
            $(this).children('.img_footer').hide();
        },
        function() {
            $(this).children('.img_caption').slideUp(250);
            $(this).children('.img_footer').show();
    });

    $('.project_img').click(function() {
        var url = $(this).attr('href');
        console.log(url);
        window.location.href = url;
    });
});
