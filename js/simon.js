function Simon (div) {
  "use strict";
  this.gamediv = div;
  // this.test = "sdfsdfsdf0";

  this.gamediv.on('click', '.simonbutton' ,
    $.proxy(this.buttonclick, this)
  );
}

Simon.prototype.buttonclick = function () {

    console.log(this);
        // console.log(this.test);
};


new Simon($("#game"));
