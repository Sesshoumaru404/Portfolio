function tictac (play) {
  this.player = {
    name : "",
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
  this.playableTiles  = this.Tiles;

  this.computerTurn = function () {
    var random = Math.floor(Math.random() * this.playableTiles.length );
    var move = this.playableTiles[random];
    this.playableTiles.splice(random, 1);
    this.computer.plays.push(move);
    $('#' + move).text(this.computer.XorO);
    if (this.gameWon(this.computer)) {
      console.log("winner");
    }
  };

  this.play = function (play) {
    var remove = this.playableTiles.indexOf(play);
    this.playableTiles.splice(remove, 1);
    this.player.plays.push(play);
    if (this.gameWon(this.player)) {
      return false;
    }
    this.computerTurn();
  };

  this.gameWon = function  (player) {
    var turns = player.plays.length;
    var lastPlay = player.plays[turns - 1];
    var inRow = player.XorO + player.XorO  + player.XorO;
    // console.log(lastPlay);
    if(turns < 3){
      return false;
    }
    console.log();
    if ($('#a' + lastPlay[1] +',#b' + lastPlay[1] + ',#c' + lastPlay[1]).text() === inRow ||
        $('#' + lastPlay[0]+ '1, #' + lastPlay[0] + '2, #' + lastPlay[0] + "3").text() === inRow ||
        $('#a1, #b2, #c3').text()  === inRow ||
        $('#a3, #b2, #c1').text()  === inRow) {
      //   console.log(inRow);
      // console.log($('#a' + lastPlay[1] +',#b' + lastPlay[1] + ',#c' + lastPlay[1]).text());
      // console.log($('#' + lastPlay[0]+ '1, #' + lastPlay[0] + '2, #' + lastPlay[0] + "3").text());
      // console.log($('#a1, #b2, #c3').text());
      // console.log($('#a3, #b2, #c1').text());
      alert("winner " + player.name);
      $.proxy(this.resetGame, this );
      // tictac.resetGame();
      return true;
    }

    this.resetGame = function () {
      console.log("reset");
      this.player.plays = [];
      this.computer.plays = [];
      this.playableTiles  = this.Tiles;
      $('.tiles').text('');
    };

  };
}


$(document).ready(function(e) {
  var game = new tictac();
  $('.tile').click(function () {
    var tile = $(this);
    tile.text(game.player.XorO);
    // console.log(tile);
    game.play(tile.attr('id'));
  });
});
