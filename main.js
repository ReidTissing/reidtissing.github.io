var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  MoveHim();

};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  //we're drawin rectangles here folks
drawRects();
  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    //we're randomly deleting rectangles folks
       randDelete();
    
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
       randDelete();
    delta = 500;

  MoveHim();

  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);

    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
  MoveHim();

};

function MoveHim() {

    var elem = document.getElementById("overlay2");
    var pos = Math.random() * 100 + 2;
    // var pos = canvas.width - 200;
    //console.log(pos)
    // var delta = 300 - Math.random() * 100;
    // var id = setInterval(frame, 5);
    // function frame() {
    // if (pos == 350) {
    //   clearInterval(id);
    // } else {
    //   pos++; 
    elem.style.padding = pos * 2 + "px";
    elem.style.left = pos + "px";
   
    // }
};

    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var c = canvas.getContext('2d');

    function Rectangle(x, y, drawwidth, drawheight) {
        this.x = x;
        this.y = y;
        this.drawheight = drawheight;
        this.drawwidth = drawwidth;
        this.draw = function() {
            c.fillStyle = "black";
            // console.log("drawing this height: " + this.drawheight);
            // console.log("drawing this width: " + this.drawwidth);
            c.fillStyle = "rgba(0,0,0,0.1)";
            c.fillRect(x, y, drawwidth, drawheight);
            // console.log("drawing")
        }
    }

    function drawRects() {
        for (var i = 0; i < 1; i++) {
            var x = Math.random() * innerWidth;
            // var y = Math.random() * innerHeight;
            var y = Math.random() * innerHeight - 200;
            var drawheight = (Math.random() * innerHeight) + 200;
            var drawwidth = Math.floor((Math.random() * 300) + 1);
            // console.log("drawheight:" + drawheight);
            var rectangle = new Rectangle(x, y, drawwidth, drawheight);
            rectangle.draw();

        }
    }
    function randDelete() {
      for (i = 0; i < 10; i++) {
      var x = Math.random() * innerWidth;
      var y = Math.random() * innerHeight;
      var width = Math.random() * innerWidth;
      var height = Math.random() * innerHeight;
      c.clearRect(x,y,width,height);
    }
 }
    drawRects();