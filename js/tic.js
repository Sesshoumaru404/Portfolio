function Tictac (div) {
  "use strict";
  this.player = {
    name : "Player",
    plays :[], wins: 0, lost: 0, games: 0, XorO: "X"
  };
  this.computer= {
    name : "Computer",
    plays :[], XorO: "O"
  };
  this.Tiles  = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
  this.playableTiles  = this.Tiles.slice(0);
  this.goodplays = [];
  $('.tile').click($.proxy(this.play, this));
  $('.startbutton').click($.proxy(this.saveplayer, this));
}

Tictac.prototype.play = function (e) {
  // What to do when player clicks in a tile
  e.preventDefault();
  // this.gameover = false;
  var clickedID = e.currentTarget.id;
  var tile = $("#" + clickedID);
  var remove = this.playableTiles.indexOf(clickedID);
  if (tile.text() !== "") {
    return false;
  }
  tile.text(this.player.XorO);
  this.player.plays.push(clickedID);
  this.playableTiles.splice(remove, 1);
  this.gameWon(this.player);
};

Tictac.prototype.computerTurn = function () {
  // What to do when it is the computers turn
  var move = this.computerlogic();
  var remove = this.playableTiles.indexOf(move);
  this.computer.plays.push(move);
  $('#' + move).text(this.computer.XorO);
  this.playableTiles.splice(remove, 1);
  this.gameWon(this.computer);
};

Tictac.prototype.computerlogic = function () {
  var move;
  // Check if computer can win
  move = this.matchthree(this.computer, this.playableTiles);
  if (move) {return move;}
  // If can't win block player
  move = this.matchthree(this.player, this.playableTiles);
  if (move) {return move;}
  // if no blocks make a play
  move = this.setupplays();
  return move;
};

Tictac.prototype.matchthree = function (player, playabled) {
  // Check to see if there are any possible three in a line
  var played = player.plays.slice(0);
  var nextmove;
  var column = [];
  var row = [];

  if (played.length >= 2 ) {
    // Check columns
    // :nth-child(3)
    for (i=1; i <= 3; i++) {
      if ($('.tile:nth-child('+ i +')').text() === player.XorO + player.XorO) {
        for (a=0; a <= 2; a++) {
          if ($('.tile:nth-child('+ i +')')[a].innerHTML === "") {
            nextmove = $('.tile:nth-child('+ i +')')[a].id;
            return nextmove;
          }
        }
      }
      // Check Rows
      // tr:nth-child(1) .tile
      if ($('tr:nth-child('+ i +') .tile').text() === player.XorO + player.XorO) {
        for (a=0; a <= 2; a++) {
          if ($('tr:nth-child('+ i +') .tile')[a].innerHTML === "") {
            nextmove = $('tr:nth-child('+ i +') .tile')[a].id;
            return nextmove;
          }
        }
      }
    }
    // Check if can win by diagonal play
    nextmove = this.diagonalCheck(player);
    if (nextmove) {
      return nextmove;
    }
  }

  return null;
};

Tictac.prototype.diagonalCheck = function (player) {
  // Check diagonal for three in a row.
  if ($('#a1, #b2, #c3').text() === player.XorO + player.XorO) {
    return this.findempty($('#a1, #b2, #c3'));
  }
  if ($('#a3, #b2, #c1').text() === player.XorO + player.XorO ) {
    return this.findempty($('#a3, #b2, #c1'));
  }
};

Tictac.prototype.findempty = function(array) {
    var tile ;
    array = [array[0], array[1], array[2]];
    for (i=0; i < array.length; i++) {
      tile = array[i];
      if ($(tile).text() === "" && this.playableTiles.indexOf(tile.id) != -1) {
        console.log('block');
        return tile.id;
      }
    }
  };

Tictac.prototype.setupplays = function () {
  // Logic so computer and make smarter plays.
  var random = Math.floor(Math.random() * this.playableTiles.length );
  var play, stopplay;
  if (this.computer.plays.length === 0) {
    if ($('#a1, #a3, #c1, #c3').text() === this.player.XorO) {
      // If corner played, play center tile
      stopplay = "b2";
      return stopplay;
    }
    if ($('#b2').text() === this.player.XorO) {
      // If center played, play corners tile
      var corners = ['a1','c1','a3','c3'];
      random = Math.floor(Math.random() * corners.length );
      stopplay = corners[random];
      return stopplay;
    }
    // Play any availible tile for first play
    play = this.playableTiles[random];
    return play;
  }
  // Prevent a corner setup for player
  if ($('#a1, #a3, #c1, #c3').text() === this.player.XorO + this.player.XorO && $('#b2').text() === this.computer.XorO && this.computer.plays.length === 1 ) {
    stopplay = ["b1", "a2", "c2", "b3"];
    random = Math.floor(Math.random() * stopplay.length );
    return stopplay[random];

  }
  // Easy win if availible
  if ($('#a1, #a3, #c1, #c3').text() === this.computer.XorO + this.computer.XorO) {
    if (this.playableTiles.indexOf('b2') != -1) {
      return 'b2';
    }
  }
  // Prevent setup win for player
  if ($('#a1, #a3, #c1, #c3').text() === this.player.XorO && $('#b1, #a2, #c2, #b3').text() === this.computer.XorO && this.computer.plays.length === 1 ) {
    if (this.playableTiles.indexOf('b2') != -1) {
      return 'b2';
    }
  }
  // Check if player can setup for a two three in row play if so prevent
  play = this.findgoodplay(this.player, this.computer, true);
  if (play) { return play;}
  // Check if best play.
  play = this.findgoodplay(this.computer, this.player);
  if (play) {
    return play;
  } else {
    // No good plays so just play
    return this.playableTiles[0];
  }
};

Tictac.prototype.findgoodplay = function (player, opp, checkdouble) {
  // Check the board for best play.
  var a, diagonal;
  this.goodplays = [];
  if (this.playableTiles.length === 1) {
    // Last play no thinking needed
    return this.playableTiles[0];
  }
  // Loop thru previous plays to find tiles that can combine to make three in row
  for (var i=0; i < player.plays.length; i++ ) {
    diagonal = ["a1", "c3", "c1", "a3", "b2"] ;
    if (diagonal.indexOf(player.plays[i]) !== -1 && opp.plays.indexOf("b2") === -1) {
      if (player.plays[i] === "a1" || player.plays[i] === "c3" ) {
        if ($("#a1").text() === opp.XorO  || $("#c3").text() === opp.XorO ){
          diagonal = [];
        } else {
          diagonal.splice(2,2);
          for ( a = 0; a < diagonal.length; a++) {
            if (this.playableTiles.indexOf(diagonal[a]) !== -1 ) {
              this.goodplays.push(diagonal[a]);
            }
          }
        }
      }
      if (player.plays[i] === "a3" || player.plays[i] === "c1" ) {
        if ($("#a3").text === opp.XorO || $("#c1").text() === opp.XorO){
          diagonal = [];
      } else {
          diagonal = diagonal.slice(2);
          for ( a = 0; a < diagonal.length; a++) {
            if (this.playableTiles.indexOf(diagonal[a]) !== -1 ) {
              this.goodplays.push(diagonal[a]);
            }
          }
        }
      }
      if (player.plays[i] === "b2") {
        diagonal.pop();
        if (opp.plays.indexOf("a3") !== -1 || opp.plays.indexOf("c1") !== -1){
          diagonal = diagonal.splice(0,2);
        }
        if (opp.plays.indexOf("a1") !== -1 || opp.plays.indexOf("c3") !== -1){
          diagonal = diagonal.splice(2);
        }
        for ( a = 0; a < diagonal.length; a++) {
          if (this.playableTiles.indexOf(diagonal[a]) !== -1 ) {
            this.goodplays.push(diagonal[a]);
          }
        }
      }
    }
    // Check for possible columun setup
    for ( a = 0; a < this.playableTiles.length; a++) {
      if (player.plays[i][0] === this.playableTiles[a][0]) {
        if (!$("td[id^='"+ player.plays[i][0] +"']").text().match(opp.XorO)) {
          this.goodplays.push(this.playableTiles[a]);
        }
      }
      // Check for possible row setup
      if (player.plays[i][1] === this.playableTiles[a][1]) {
        if (!$("td[id$="+ player.plays[i][1] +"]").text().match(opp.XorO)) {
          this.goodplays.push(this.playableTiles[a]);
        }
      }
    }
  }
  this.goodplays = this.goodplays.sort();
  // Check it same tile is used multiply three in rows
  for (i=0; i < this.goodplays.length; i++ ) {
    if (this.goodplays[i] === this.goodplays[i+1]) {
      play = this.goodplays[i];
      return play;
    }
  }

  if (checkdouble) {
   return;
  }

  var randomGoodplay = Math.floor(Math.random() * this.goodplays.length );
  play = this.goodplays[randomGoodplay];
  return play;

};

Tictac.prototype.gameWon = function  (playerturn) {
  // If is the game is won
  if(playerturn.plays.length < 3){
    if (playerturn.name === this.player.name) {
        return this.computerTurn();
    }
    return;
  }
  var turns = playerturn.plays.length;
  var lastPlay = playerturn.plays[turns - 1];
  var row = lastPlay[1];
  var column = lastPlay[0].charCodeAt() - 96;
  var inRow = playerturn.XorO + playerturn.XorO  + playerturn.XorO;
  var winner;
  // Check columns
  // :nth-child(3)
  if ($('.tile:nth-child('+ column +')').text() === inRow) {
    $('.tile:nth-child('+ column +')').css("color", "red");
    winner = true;
  }
  // Check Rows
  // tr:nth-child(1) .tile
  if ($('tr:nth-child('+ row +') .tile').text() === inRow) {
    $('tr:nth-child('+ row +') .tile').css("color", "red");
    winner = true;
  }
  if ($('#a1, #b2, #c3').text() === inRow ) {
    $('#a1, #b2, #c3').css("color", "red");
    winner = true;
  }
  if ($('#a3, #b2, #c1').text() === inRow ) {
    $('#a3, #b2, #c1').css("color", "red");
    winner = true;
  }
  if (winner) {
    if (playerturn.name === this.computer.name ) {
      $(".gameresult").text('You Lost');
      this.player.lost++;
    }else {
      $(".gameresult").text('Winner!!!');
      this.player.wins++;
    }
    $("#gameover").show();
    this.gameover = true;
    return setTimeout($.proxy(this.resetBoard, this), 1200);
  }
  if (playerturn.name === this.player.name && this.playableTiles.length !== 0) {
    return this.computerTurn();
  }
  if (this.playableTiles.length === 0) {
    $(".gameresult").text('Draw');
    $("#gameover").show();
    this.gameover = true;
    return setTimeout($.proxy(this.resetBoard, this), 1200);
  }
};

Tictac.prototype.resetBoard = function () {
  // Start a new game.
  this.player.games++;
  var gamestied = this.player.games - (this.player.lost + this.player.wins);
  this.player.plays = [];
  this.computer.plays = [];
  this.playableTiles = this.Tiles.slice(0);
  $(".gameslost").text(this.player.lost);
  $(".gamestied").text(gamestied);
  $(".gameswon").text(this.player.wins);
  $('.tile').css('color', 'black');
  $('.tile').text('');
  $("#gameover").hide();
  if (this.player.games % 2 !== 0 ) {
    this.computerTurn();
  }
};

Tictac.prototype.saveplayer = function (e) {
  // Setup the game board
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
  $(".playername").text(this.player.name);
  $(".piece").text(this.player.XorO);
  $('.start').hide();
  $("#board").show();
};

new Tictac('#game');
