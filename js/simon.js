function Simon (div) {
  "use strict";
  this.gamediv = div;
  this.currentpattern = [];
  this.currentcolor = "";
  this.gameOptions = ['red', 'green', 'blue', 'yellow'];
  this.playable = true;
  this.playcount = 0;
  this.checkcount = 0;
  this.speed = 1500;
  this.count = $(".count");
  this.colorblue = $("path#blue").attr('fill');
  this.colorred = $("path#red").attr('fill');
  this.colorgreen = $("path#green").attr('fill');
  this.coloryellow = $("path#yellow").attr('fill');
  this.buzzer = document.createElement('audio');
  this.buzzer.setAttribute('src', '../files/buzz.mp3');
  this.gamediv.on('click', '.starts', $.proxy(this.startgame, this));
  this.gamediv.on('mousedown', '.simonbutton',
    $.proxy(this.glowstart, this)
  );
  this.gamediv.on('mouseup', '.simonbutton',
    $.proxy(this.glowend, this)
  );
  this.gamediv.on('mouseout', '.simonbutton',
    $.proxy(this.glowend, this)
  );
  this.gamediv.on('click', '.stops',
    $.proxy(this.reset, this)
  );
  this.gamediv.on('click', '.stricts',
    $.proxy(this.reset, this)
  );
}

Simon.prototype.reset = function () {
    this.currentpattern = [];
    this.playcount = 0;
    this.checkcount = 0;
    this.count.text("--");
    $('.starts').show();
    $('.stops').hide();
};

Simon.prototype.startgame = function (e) {
  $('.starts').hide();
  $('.stops').show();
  this.playable = false;
  console.log(this.gamepaused);
  return this.nextpattern();
};

Simon.prototype.glowstart = function (e) {
  if (!this.playable) {
    return false;
  }
  var simonbutton =  $(e.currentTarget).attr('id');
  this.currentcolor = simonbutton;
  this.buttoneffect(simonbutton);
  if (this.checkentry(simonbutton)) {
    if  (this.checkcount === this.currentpattern.length) {
      this.playable = false;
      this.checkcount = 0;
      return this.nextpattern();
    }
    return false;
  } else {
    this.playable = false;
    this.playcount = 0;
    this.buzzer.play();
    setTimeout($.proxy(this.playback, this), 2000);
  }
  // this.currentpattern.push(nextpattern);
};

Simon.prototype.nextpattern = function () {
  var nextpattern = Math.floor(Math.random() * this.gameOptions.length );
  var number = 0;
  nextpattern = this.gameOptions[nextpattern];
  this.currentpattern.push(nextpattern);
  console.log();
  if (this.currentpattern.length > 9 ){
    number = this.currentpattern.length;
  } else {
   number = "0" + this.currentpattern.length;
  }
  this.count.text(number);
  this.playcount = 0;
  this.playpattern();
};

Simon.prototype.playpattern = function () {
  // var that = this;
  // this.deferredresume = $.Deferred();

  setTimeout($.proxy(this.playback, this), this.speed);

  // return  this.deferredresume.promise();
};

Simon.prototype.playback = function () {
  // console.log();
  var id = this.currentpattern[this.playcount];
  this.currentcolor = this.currentpattern[this.playcount];
  var color = this['color' + id];
   this.buttoneffect();
   this.playcount++;
   setTimeout($.proxy(this.glowend, this), this.speed - 200);
   if (this.playcount < this.currentpattern.length) {
       return this.playpattern();
   } else if (this.playcount === this.currentpattern.length) {
     // speed not fast that 500
    //  this.speed = this.speed -100;
     this.playable = true;
     console.log(this.playable, "playback done ");
     return false;
   }else {
    //  setTimeout(this.gamepaused = false, this.speed + 300);
   }
};

Simon.prototype.checkentry = function (simonbutton) {
  var id = simonbutton;
  if (id === this.currentpattern[this.checkcount] ) {
    this.checkcount++;
    return true;
  } else {
    this.checkcount = 0;
    return false;
  }
};

Simon.prototype.glowend = function () {
  $("path#" + this.currentcolor).attr('fill', this['color' + this.currentcolor]);
};

Simon.prototype.buttoneffect = function () {
  var id = this.currentcolor;
  var audioElement = document.createElement('audio');
  this.resetcolor = $("path#" + id).attr('fill');
  $("path#" + id).attr('fill', 'url(#Gradient'+ id +')');
  audioElement.setAttribute('src', '../files/notes/simonSound' + id + '.mp3');
  audioElement.play();
};

new Simon($("#game"));
