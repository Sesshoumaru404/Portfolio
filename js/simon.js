function Simon (div) {
  "use strict";
  this.gamediv = div;
  this.currentpattern = [];
  this.gameOptions = ['red', 'green', 'blue', 'yellow'];
  this.gamepaused = true;
  this.playcount = 0;
  this.checkcount = 0;
  this.speed = 1200;
  this.count = $(".count");
  this.colorblue = $("path#blue").attr('fill');
  this.colorred = $("path#red").attr('fill');
  this.colorgreen = $("path#green").attr('fill');
  this.coloryellow = $("path#yellow").attr('fill');
  this.notes2 = [
    "E", "E", "F", "G", "G", "F", "E", "D", "C", "C", "D", "E", "E", "D", "D"
  ];
  this.notes = [
    "G", "E", "C", "E", "G", "C", "E", "D", "C", "E", "F", "G",
    "G", "G", "E", "D", "C", "B", "A", "B", "C", "C", "E","G", "C"
  ];
  // this.drawboard();
  // this.test = "sdfsdfsdf0";
    this.gamediv.on('click', '.starts' ,
    $.proxy(this.startgame, this)
  );

  // console.log(this['playcount']);
  if (this.gamepaused) {
    this.gamediv.on('mousedown', '.simonbutton' ,
      $.proxy(this.glowstart, this)
    );
  }

  this.gamediv.on('mouseup', '.simonbutton' ,
    $.proxy(this.glowend, this)
  );
  this.gamediv.on('mouseout', '.simonbutton' ,
    $.proxy(this.glowend, this)
  );

  // this.gamediv.on('click', '.simonbutton' ,
  //   $.proxy(this.buttonclick, this)
  // );
}

Simon.prototype.startgame = function (e) {
  // this.gamepaused = false;
  return this.nextpattern();
};

Simon.prototype.glowstart = function (e) {
  simonbutton =  $(e.currentTarget).attr('id');
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
  // this.currentpattern.push(nextpattern);
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
  //
  // console.log(this.currentGame);
    // $('.simonbutton').removeClass('clicked');
};

Simon.prototype.nextpattern = function () {
  var nextpattern = Math.floor(Math.random() * this.gameOptions.length );
  nextpattern = this.gameOptions[nextpattern];
  this.currentpattern.push(nextpattern);
  this.count.text(this.currentpattern.length);
  this.playcount = 0;
  this.playpattern();
};

Simon.prototype.playpattern = function () {
  var that = this;
  // this.deferredresume = $.Deferred();

  setTimeout($.proxy(this.playback, this), this.speed);

  // return  this.deferredresume.promise();
};

Simon.prototype.playback = function () {
  // console.log();
  var id = this.currentpattern[this.playcount];
  var color = this['color' + id];
   this.buttoneffect(id);
   this.playcount++;
   setTimeout(function (){
    $("path#" + id).attr('fill', color);
  }, 500);
   if (this.playcount < this.currentpattern.length) {
       return this.playpattern();
   } else if (this.playcount === this.currentpattern.length) {
     // speed not fast that 500 
     this.speed = this.speed -100;
     $('.speed').text(this.speed );
    //  console.log("hey");
     this.gamepaused = false;
   }else {
     setTimeout(this.gamepaused = false, this.speed + 300);
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

Simon.prototype.glowend = function (e) {
  simonbutton =  $(e.currentTarget).attr('id');
  $("path#" + simonbutton).attr('fill', this['color' + simonbutton]);
};

Simon.prototype.buttoneffect = function (id) {
  this.resetcolor = $("path#" + id).attr('fill');
  $("path#" + id).attr('fill', 'url(#Gradient'+ id +')');
  this.sounds(id);
};

Simon.prototype.sounds = function (sound) {
  console.log(sound);
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../files/notes/simonSound' + sound + '.mp3');
  // audioElement.setAttribute('autoplay', 'autoplay');
  // audioElement.durationchange(5000);
  audioElement.play();
  // audioElement.loop = true;
};





new Simon($("#game"));
