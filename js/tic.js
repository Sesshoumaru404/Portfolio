function Tictac (div) {
  "use strict";
  this.player = {
    name : "Player",
    plays :[], wins: 0, lost: 0, games: 0, XorO: "X"
  };
  this.computer= {
    name : "Computer",
    plays :[], XorO: "O", nextplay: null
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
  var clickedID = e.currentTarget.id;
  var tile = $("#" + clickedID);
  var remove = this.playableTiles.indexOf(clickedID);
  if (tile.text() !== "") {
    return false;
  }
  tile.text(this.player.XorO);
  this.player.plays.push(clickedID);
  this.playableTiles.splice(remove, 1);
  if (this.gameWon(this.player)) {
    this.resetBoard();
    return false;
  }
  this.computerTurn();
};

Tictac.prototype.computerTurn = function () {
  var move = this.computerlogic();
  var remove = this.playableTiles.indexOf(move);
  // console.log(move, remove, this.playableTiles);
  this.computer.plays.push(move);
  $('#' + move).text(this.computer.XorO);
  this.playableTiles.splice(remove, 1);
  if (this.gameWon(this.computer)) {
    this.resetBoard();
    return false;
  }
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
    }
    // Check Rows
    // tr:nth-child(1) .tile
    for (i=1; i <= 3; i++) {
      if ($('tr:nth-child('+ i +') .tile').text() === player.XorO + player.XorO) {
        for (a=0; a <= 2; a++) {
          if ($('tr:nth-child('+ i +') .tile')[a].innerHTML === "") {
            nextmove = $('tr:nth-child('+ i +') .tile')[a].id;
            return nextmove;
          }
        }
      }
    }
    // Check if can win by cross play
    nextmove = this.checkCross(player);
    if (nextmove) {
      this.computer.nextplay = nextmove;
      return this.computer.nextplay;
    }
  }

  return null;
};

Tictac.prototype.checkCross = function (player) {
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
  var random = Math.floor(Math.random() * this.playableTiles.length );
  var play, diagonal, stopplay;
  if (this.computer.plays.length === 0) {
    if ($('#a1, #a3, #c1, #c3').text() === this.player.XorO) {
      stopplay = "b2";
      return stopplay;
    }
    play = this.playableTiles[random];
    return play;
  }
  if ($('#a1, #a3, #c1, #c3').text() === this.player.XorO + this.player.XorO && $('#b2').text() === this.computer.XorO && this.computer.plays.length === 1 ) {
    stopplay = ["b1", "a2", "c2", "b3"];
    random = Math.floor(Math.random() * stopplay.length );
    return stopplay[random];

  }
  if ($('#a1, #a3, #c1, #c3').text() === this.computer.XorO + this.computer.XorO) {
    console.log("play center");
    if (this.playableTiles.indexOf('b2') != -1) {
      return 'b2';
    }
  }
  play = this.diagonal(this.player, this.computer, true);
  if (play) { return play;}
  play = this.diagonal(this.computer, this.player);
  return play;
};

Tictac.prototype.diagonal = function (player, opp, checkdouble) {
  var a;
  this.goodplays = [];
  if (this.playableTiles.length === 1) {
    return this.playableTiles[0];
  }
  for (var i=0; i < player.plays.length; i++ ) {
    // console.log(i, "looop", this.computer.plays.length );
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
      console.log("diagonal step 1", diagonal, player.name);
    }
    for ( a = 0; a < this.playableTiles.length; a++) {
      if (player.plays[i][0] === this.playableTiles[a][0]) {
        if (!$("td[id^='"+ player.plays[i][0] +"']").text().match(opp.XorO)) {
          this.goodplays.push(this.playableTiles[a]);
        }
      }
      if (player.plays[i][1] === this.playableTiles[a][1]) {
        if (!$("td[id$="+ player.plays[i][1] +"]").text().match(opp.XorO)) {
          this.goodplays.push(this.playableTiles[a]);
        }
      }
    }
  }
  this.goodplays = this.goodplays.sort();
  console.log(this.goodplays, player.name);
  for (i=0; i < this.goodplays.length; i++ ) {
    if (this.goodplays[i] === this.goodplays[i+1]) {
      console.log("dup play");
      play = this.goodplays[i];
      return play;
    }
  }

  if (checkdouble) {
   console.log("skip");
   return;
  }

  var randomGoodplay = Math.floor(Math.random() * this.goodplays.length );
  play = this.goodplays[randomGoodplay];
  console.log(this.goodplays, play);
  return play;

};

Tictac.prototype.gameWon = function  (playerturn) {
  var turns = playerturn.plays.length;
  var lastPlay = playerturn.plays[turns - 1];
  var inRow = playerturn.XorO + playerturn.XorO  + playerturn.XorO;
  var winner;
  // console.log(lastPlay, inRow, turns);
  if(turns < 3){
    return false;
  }
  if ($('#a' + lastPlay[1] +',#b' + lastPlay[1] + ',#c' + lastPlay[1]).text() === inRow) {
    $('#a' + lastPlay[1] +',#b' + lastPlay[1] + ',#c' + lastPlay[1]).css("color", "red");
    winner = true;
  }
  if ($('#' + lastPlay[0]+ '1, #' + lastPlay[0] + '2, #' + lastPlay[0] + "3").text() === inRow) {
    $('#' + lastPlay[0]+ '1, #' + lastPlay[0] + '2, #' + lastPlay[0] + "3").css("color", "red");
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
    alert("winner " + playerturn.name);
    if (playerturn.name === this.computer.name ) {
      this.player.lost++;
    }else {
      this.player.wins++;
    }
    return true;
  }
  if (this.playableTiles.length === 0) {
    alert('draw');
    return true;
  }
};

Tictac.prototype.resetBoard = function () {
  this.player.games++;
  console.log(this.player.lost , this.player.wins);
  var gamestied = this.player.games - (this.player.lost + this.player.wins);
  this.player.plays = [];
  this.computer.plays = [];
  this.playableTiles = this.Tiles.slice(0);
  $(".gameslost").text(this.player.lost);
  $(".gamestied").text(gamestied);
  $(".gameswon").text(this.player.wins);
  $('.tile').css('color', 'black');
  $('.tile').text('');
  if (this.player.games % 2 !== 0 ) {
    this.computerTurn();
  }
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
  $(".playername").text(this.player.name);
  $(".piece").text(this.player.XorO);
  $("#board").show();
};

new Tictac('#game');
