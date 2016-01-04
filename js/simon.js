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
  this.strictOn = false;
  this.count = $(".count");
  this.colorblue = $("path#blue").attr('fill');
  this.colorred = $("path#red").attr('fill');
  this.colorgreen = $("path#green").attr('fill');
  this.coloryellow = $("path#yellow").attr('fill');
  this.buzzer = document.createElement('audio');
  this.buzzer.setAttribute('src', '../files/buzz.mp3');
  this.gamediv.on('click', '.starts', $.proxy(this.startgame, this));
  this.gamediv.on('mousedown', '.simonbutton', $.proxy(this.glowstart, this));
  this.gamediv.on('mouseup', '.simonbutton', $.proxy(this.glowend, this));
  this.gamediv.on('mouseout', '.simonbutton', $.proxy(this.glowend, this));
  this.gamediv.on('click', '.stops', $.proxy(this.reset, this));
  this.gamediv.on('click', '.stricts', $.proxy(this.strict, this));
}

Simon.prototype.strict = function () {
  // When strict letter are clicked
  if (this.currentpattern.length !== 0) {
    return false;
  }
  if (this.strictOn) {
    $('.stricts').css('color','#6F6F6A');
    this.strictOn = false;
  } else {
    $('.stricts').css('color',' #FFFF00');
    this.strictOn = true;
  }
};

Simon.prototype.reset = function () {
  // Reset board after stop letters are clicked
    this.currentpattern = [];
    this.playcount = 0;
    this.checkcount = 0;
    this.count.text("--");
    $('.starts').show();
    $('.stops').hide();
};

Simon.prototype.startgame = function (e) {
  // Start a new game after start letters are clicked
  $('.starts').hide();
  $('.stops').show();
  this.playable = false;
  console.log(this.gamepaused);
  return this.nextpattern();
};

Simon.prototype.glowstart = function (e) {
  // Add glow effect to tiles after mousedown and
  // check if click matches pattern.
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
    this.buzzer.play();
    this.playable = false;
    this.playcount = 0;
    if (this.strictOn) {
        this.currentpattern = [];
        this.checkcount = 0;
        this.count.text("--");
        return this.nextpattern();
    }
    setTimeout($.proxy(this.playback, this), 2000);
  }
};

Simon.prototype.nextpattern = function () {
  // Start a new pattern or extend a current pattern.
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

Simon.prototype.playback = function () {
  // play back the curent pattern.
  var id = this.currentpattern[this.playcount];
  this.currentcolor = this.currentpattern[this.playcount];
  var color = this['color' + id];
   this.buttoneffect();
   this.playcount++;
   setTimeout($.proxy(this.glowend, this), this.speed);
   if (this.playcount < this.currentpattern.length) {
       return this.playpattern();
   }
   if (this.playcount === this.currentpattern.length) {
    //  Lowest speed is 500.
     if (this.currentpattern.length % 4 === 0 && this.speed - 500 >= 500){
       this.speed = this.speed - 500;
     }
     this.playable = true;
     console.log(this.playable, "playback done ");
     return false;
   }
};

Simon.prototype.playpattern = function () {
  // delay playback
  setTimeout($.proxy(this.playback, this), this.speed);
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
  // End the glow effect
  $("path#" + this.currentcolor).attr('fill', this['color' + this.currentcolor]);
};

Simon.prototype.buttoneffect = function () {
  // Add glow effect plus sound
  var id = this.currentcolor;
  var audioElement = document.createElement('audio');
  this.resetcolor = $("path#" + id).attr('fill');
  $("path#" + id).attr('fill', 'url(#Gradient'+ id +')');
  audioElement.setAttribute('src', '../files/notes/simonSound' + id + '.mp3');
  audioElement.play();
};

new Simon($("#game"));
