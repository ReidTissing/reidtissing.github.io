
var canvas2 = document.getElementById("cv2");
var ctx = canvas2.getContext("2d");
var scaleX = window.innerWidth / canvas2.width;
var scaleY = window.innerHeight / canvas2.height;

var scaleToFit = Math.min(scaleX, scaleY);
var scaleToCover = Math.max(scaleX, scaleY);
canvas2.width = window.innerWidth;
canvas2.height = (window.innerHeight / 20);

ctx.font = "12px verdana";
ctx.fillStyle = 'rgba(255,255,255,0.5)';
ctx.fillText("press a key", scaleX,scaleY);


var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    console.log(this);
    MoveHim();

};
var mouse = {
    x: undefined,
    y: undefined
};
console.log(mouse);
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var mousedown = false;
var mouseup = true;
var colorArray = [
'rgba(55,22,22,0.1)',
'rgba(0,11,11,0.1)',
'rgba(22,0,44,0.1)',
'rgba(0,0,33,0.1)'
];
var fillColor = "rgba(255,0,0,0.1)";
function Rectangle(x, y, drawwidth, drawheight) {

    this.x = x;
    this.y = y;
    this.drawheight = drawheight;
    this.drawwidth = drawwidth;

    if (mouse.x - this.x > 10 || mouse.x - this.x < 20) {
        this.x = mouse.x;
    }
    if (mouse.y - this.y > 10 || mouse.y - this.y < 20) {
        this.y = mouse.y;
    }
    if (mousedown == true && mouseup == false) {
      fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      //fillColor = 'rgba(0,0,52,0.1)';
    }
    if (mousedown == false && mouseup == true) {
      fillColor = 'rgba(0,0,0,0.1)';
    }
    this.draw = function() {
      c.fillStyle = fillColor;
        //c.fillStyle = "black";
        // console.log("drawing this height: " + this.drawheight);
        // console.log("drawing this width: " + this.drawwidth);
  c.fillStyle = fillColor;
        c.fillRect(x, y, drawwidth, drawheight);
    }

}

function drawRects() {

    for (var i = 0; i < 1; i++) {
        var x = (Math.random() * mouse.x * 2);
        if (isNaN(x)) {
            // console.log("we out here");
            var x = Math.random() * innerWidth;
            // console.log(x);
        }
        if (isNaN(y)) {
            // console.log("we bout here");
            var y = Math.random() * innerHeight;
            // console.log(y);
        }
        // console.log(x);
        // var x = mouse.x;
        // var y = Math.random() * innerHeight;
        var y = (innerHeight / y);
        // console.log(y);
        // var y = mouse.y;
        // var drawheight = (Math.random() * innerHeight) + 200;
        var drawheight = (Math.random() * innerHeight) + x;

        // var drawwidth = Math.floor((Math.random() * 300) + 1);
        var drawwidth = Math.floor((Math.random() * innerWidth - 2000) + y);
        // console.log("drawheight:" + drawheight);
        var color = fillColor;
        var rectangle = new Rectangle(x, y, drawwidth, drawheight);
        rectangle.draw();

    }
}

function randDelete() {
    for (i = 0; i < 10; i++) {
        // var x = Math.random() * innerWidth;
        // var y = Math.random() * innerHeight;
        var x = mouse.x;
        var y = mouse.y;
        if (isNaN(x)) {
            var x = Math.random() * innerWidth;
        }
        if (isNaN(y)) {
            var y = Math.random() * innerHeight;
        }
        // var y = mouse.y;
        var width = x - (Math.random() * innerWidth) - 2;
        // var width = Math.random() * innerWidth;
        var height = y - (Math.random() * innerHeight) + 2;
        // console.log("height: " + height);
        c.clearRect(x, y, width, height);
    }
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawRects();
    randDelete();
    // console.log(mouse);
})
window.addEventListener('mousedown', function(event) {
  mousedown = true;
  mouseup = false;
})
window.addEventListener('mouseup', function(event) {
  mouseup = true;
  mousedown = false;
})

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    // fullTxt = fullTxt + "<h1>?</h1>";

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        randDelete();
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        drawRects();
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    //we're drawin rectangles here folks
    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        //we're randomly deleting rectangles folks
        // randDelete();

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;

        MoveHim();

    }

    setTimeout(function() {
        that.tick();
    }, delta);
};



this.update = function() {
    console.log("update");
}
window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);

        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #666 }";
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