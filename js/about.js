$(document).ready(function (e) {
  var page = location.pathname.split("/");
  $('.is-active').removeClass('is-active');
  page = page[page.length -1].split(".")[0];
  $("#" + page).addClass('is-active');
});
