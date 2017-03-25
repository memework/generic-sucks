'use strict';

var qry = function qry(s) {
  return document.querySelector(s);
};
var cnvs = qry('canvas');
var ctx = cnvs.getContext('2d');

function resize() {
  cnvs.width = innerWidth;
  cnvs.height = innerHeight;
}

var memes = [];

memes.push({
  image: qry("#img-b1nzy"),
  x: 50, y: 50, size: 50, speed: 0.05
});

function draw() {
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);
  ctx.fillStyle = '#7289DA';
  ctx.fillRect(0, 0, cnvs.width, cnvs.height);

  for (var _iterator = memes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var meme = _ref;

    ctx.save();
    ctx.translate(meme.x, meme.y);
    ctx.drawImage(meme.image, meme.x, meme.y, meme.width, meme.height);
    ctx.restore();
    meme.y += meme.speed;
  }

  for (var i = memes.length - 1; i > 0; i--) {
    if (memes[i].y > innerHeight + memes[i].image.height) {
      console.log('snowflake: removed ' + i + ', total=' + memes.length);
      memes.splice(i, 1);
    }
  }

  requestAnimationFrame(draw);
}

// Resize the canvas
resize();
window.addEventListener('resize', function () {
  return resize();
});

var images = [qry('#img-b1nzy'), qry('#img-eyes'), qry('#img-cat'), qry('#img-jake')];

setInterval(function () {
  var far = Math.random() + 0.4;
  var img = images[Math.floor(Math.random() * images.length)];
  var x = Math.floor(Math.random() * (innerWidth - 250));
  var y = 0 - img.height * 2;
  memes.push({
    image: img,
    x: x, y: y,
    width: img.width * far,
    height: img.height * far,
    speed: img.width * far / 10,
    rot: Math.random() * 2
  });
}, 5);

// Draw
draw();
requestAnimationFrame(draw);
