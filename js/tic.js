function Tictac (div) {
  "use strict";
  this.player = {
    name : "Player",
    plays :[],
    wins: 0,
    games: 0,
    XorO: "X"
  };
  this.computer= {
    name : "Beat Me",
    plays :[],
    XorO: "O"
  };

  this.Tiles  = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
  this.playableTiles  = this.Tiles.slice(0);
  $('.tile').click($.proxy(this.play, this));
  $('.startbutton').click($.proxy(this.saveplayer, this));
}

Tictac.prototype.play = function (e) {
  e.preventDefault();
  var clickedID = e.currentTarget.id;
  var tile = $("#" + clickedID);
  var remove = this.playableTiles.indexOf(clickedID);
  tile.text(this.player.XorO);
  this.player.plays.push(clickedID);
  if (this.gameWon(this.player)) {
    return false;
  }
  this.playableTiles.splice(remove, 1);
  if (this.playableTiles.length === 0) {
    alert('draw');
    this.resetBoard();
    return false;
  }
  this.computerTurn();
};

Tictac.prototype.computerlogic = function () {
  var random = Math.floor(Math.random() * this.playableTiles.length );
  var move = this.playableTiles[random];

  function combo(player, playabled) {
    var played = player.plays;
    var filtered;

    if (played.length >=2 ) {
      played.forEach(function (element, index, array) {
        var nextmove;
        var filtered = array.filter(function (value){
          // console.log(element, value);
          return value[0] == element[0];
        });
        if (filtered.length == 2) {
          var total = parseInt(filtered[0][1]) + parseInt(filtered[1][1]);
          total = total - 6;
          nextmove =  element[0] + total;
          if (playabled.indexOf(nextmove) != -1) {
            console.log(playabled.indexOf(nextmove), playabled);
            move = element[0] + total;
            return;
          }
        }
      });
    }
  }

  combo(this.player, this.playableTiles);

  return move;
};

Tictac.prototype.computerTurn = function () {
  var move = this.computerlogic();
  var remove = this.playableTiles.indexOf(move);
  console.log(move, remove, this.playableTiles);
  this.computer.plays.push(move);
  $('#' + move).text(this.computer.XorO);
  if (this.gameWon(this.computer)) {
    console.log("winner");
  }
  this.playableTiles.splice(remove, 1);
};


Tictac.prototype.gameWon = function  (player) {
  var turns = player.plays.length;
  var lastPlay = player.plays[turns - 1];
  var inRow = player.XorO + player.XorO  + player.XorO;
  // console.log(lastPlay, inRow, turns);
  if(turns < 3){
    return false;
  }
  if ($('#a' + lastPlay[1] +',#b' + lastPlay[1] + ',#c' + lastPlay[1]).text() === inRow ||
      $('#' + lastPlay[0]+ '1, #' + lastPlay[0] + '2, #' + lastPlay[0] + "3").text() === inRow ||
      $('#a1, #b2, #c3').text()  === inRow ||
      $('#a3, #b2, #c1').text()  === inRow) {
    alert("winner " + player.name);
    this.resetBoard();
    return true;
  }
};

Tictac.prototype.resetBoard = function () {
  this.player.plays = [];
  this.computer.plays = [];
  this.playableTiles = this.Tiles.slice(0);
  $('.tile').text('');
};

Tictac.prototype.saveplayer = function (e) {
  e.preventDefault();
  var name = $(".name").val();
  var side = $("#inlineRadioO");
  if (name) {
    this.player.name = name;
  }
  if (side.is(':checked')){
    this.player.XorO = "O";
    this.computer.XorO = "X";
  }
  $('.start').hide();
  $("#board").show();
};

new Tictac('#game');
