function Simon (div) {
  "use strict";
  this.gamediv = div;
  this.currentpattern = [];
  this.gameboard = document.getElementById('tutorial');
  this.gameOptions = ['red', 'white', 'blue'];
  this.gamepaused = false;
  this.playcount = 0;
  this.checkcount = 0;
  this.notes2 = [
    "E", "E", "F", "G", "G", "F", "E", "D", "C", "C", "D", "E", "E", "D", "D"
  ];
  this.notes = [
    "G", "E", "C", "E", "G", "C", "E", "D", "C", "E", "F", "G",
    "G", "G", "E", "D", "C", "B", "A", "B", "C", "C", "E","G", "C"
  ];
  this.drawboard();
  // this.test = "sdfsdfsdf0";
    this.gamediv.on('click', '#start' ,
      $.proxy(this.startgame, this)
    );

  if (!this.gamepaused) {
    this.gamediv.on('click', '.simonbutton' ,
      $.proxy(this.buttonclick, this)
    );
  }
}

Simon.prototype.startgame = function (e) {
  // this.gamepaused = false;
  return this.nextpattern();
};

Simon.prototype.buttonclick = function (e) {
  this.gamepaused = true;
  var simonbutton =  $(e.currentTarget).attr('id');

  this.buttoneffect(simonbutton);
  if (this.checkentry(simonbutton)) {
    console.log(this.checkcount);
    console.log(this.currentpattern.length);
    if  (this.checkcount === this.currentpattern.length) {
      this.checkcount = 0;
      return this.nextpattern();
    }
    return false;
  } else {
    return this.playback();
  }

  console.log(this.currentGame);
    // $('.simonbutton').removeClass('clicked');
};

Simon.prototype.nextpattern = function () {
  var nextpattern = Math.floor(Math.random() * this.gameOptions.length );
  nextpattern = this.gameOptions[nextpattern];
  this.currentpattern.push(nextpattern);
  this.playcount = 0;
  this.playpattern();
};

Simon.prototype.playpattern = function () {
  var that = this;
  this.deferredresume = $.Deferred();

  setTimeout($.proxy(this.playback, this), 1200);

  return  this.deferredresume.promise();
};

Simon.prototype.playback = function () {
   this.buttoneffect(this.currentpattern[this.playcount]);
   this.playcount++;
   if (this.playcount < this.currentpattern.length) {
       return this.playpattern();
   } else if (this.playcount === this.currentpattern.length) {
     console.log("hey");
     this.gamepaused = false;
   }else {
     setTimeout(this.gamepaused = false, 1500);
   }
};

Simon.prototype.checkentry = function (simonbutton) {
  var id = simonbutton;
  if (id === this.currentpattern[this.checkcount] ) {
    this.checkcount++;
    this.gamepaused = false;
    return true;
  } else {
    this.checkcount = 0;
    console.log(this.checkcount);
  }
};

Simon.prototype.buttoneffect = function (id) {
  $("#" + id).addClass('clicked');
  this.sounds(id);
  setTimeout(function (){
    $("#" + id).removeClass('clicked');
  }, 200);
  // this.currentpattern.push(nextpattern);
};

Simon.prototype.sounds = function (sound) {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../files/notes/simonSound' + sound.toLowerCase() + '.mp3');
  audioElement.setAttribute('autoplay', 'autoplay');
  //audioElement.load()
};

// Drawing code below

Simon.prototype.drawboard = function (argument) {
  if (  this.gameboard.getContext){
    var ctx = this.gameboard.getContext('2d');
    var bordercolor = "white";
    console.log("draw");

    var bordercircle = new Path2D();
    bordercircle.moveTo(125, 35);
    bordercircle.arc(225, 225, 210, 0, 2 * Math.PI);
    // bordercircle.fill();

    var gamecirle = new Path2D();
    // bordercircle.moveTo(125, 35)
    gamecirle.arc(225, 225, 100, 0, 2 * Math.PI);

    var gamecirleborder = new Path2D();
    // bordercircle.moveTo(125, 35)
    gamecirleborder.arc(225, 225, 110, 0, 2 * Math.PI);


    var border = new Path2D();
    // bordercircle.moveTo(125, 35)
    border.arc(225, 225, 220, 0, 2 * Math.PI);

    ctx.fillStyle = bordercolor;
    ctx.fill(border);
    // ctx.globalCompositeOperation = 'destination-over';

    //yellow
    ctx.fillStyle = bordercolor;
    ctx.fillRect (5, 5, 220, 220);
    ctx.fillStyle = "rgba(226, 220, 21, 1)";
    ctx.fillRect (5, 5, 215, 215);

    //red
    ctx.fillStyle = bordercolor;
    ctx.fillRect (225, 5, 220, 220);
    ctx.fillStyle = "rgba(206, 12, 12, 1)";
    ctx.fillRect (230, 5, 215, 215);

    //blue
    ctx.fillStyle = bordercolor;
    ctx.fillRect (5, 225, 220, 220);
    ctx.fillStyle = "rgba(28, 38, 60, 1)";
    ctx.fillRect (0, 230, 220, 220);

    //green
    ctx.fillStyle = bordercolor;
    ctx.fillRect (225, 225, 220, 220);
    ctx.fillStyle = "rgba(14, 243, 25, 1)";
    ctx.fillRect (230, 230, 220, 220);
    // ctx.fill(yellowcircle);
    // ctx.fillStyle = "rgb(200,0,0)";
    // ctx.fillRect (10, 10, 55, 50);


    // ctx.arc(200, 200, 180, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fill(bordercircle);

    // ctx.arc(200, 200, 100, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = bordercolor;
    ctx.fill(gamecirleborder);

    ctx.fillStyle = "white";
    ctx.fill(gamecirle);

    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect (30, 30, 55, 50);
  } else {
    $("#game").show();
  }
};



new Simon($("#game"));
