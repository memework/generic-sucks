'use strict';

var cnvs = document.querySelector('canvas');
var ctx = cnvs.getContext('2d');

function resize() {
  cnvs.width = innerWidth;
  cnvs.height = innerHeight;
}

var memes = [];

function draw() {
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);

  ctx.fillStyle = '#7289DA'; // blurple
  ctx.fillRect(0, 0, cnvs.width, cnvs.height);

  for (var i = 0; i < memes.length; i++) {
    let meme = memes[i];
    ctx.save();
    ctx.translate(meme.x, meme.y);
    ctx.drawImage(meme.image, meme.x, meme.y, meme.width, meme.height);
    ctx.restore();

    meme.y += meme.speed;
    meme.x -= meme.speed;
  }

  // remove sprites that fall off of the screen
  for (var i = memes.length - 1; i > 0; i--) {
    if (memes[i].y > innerHeight + memes[i].image.height) {
      memes.splice(i, 1);
    }
  }

  // draw again
  requestAnimationFrame(draw);
}

// resize the canvas
resize();
window.addEventListener('resize', function() {
  resize();
});

var images = document.querySelectorAll('.images img');

setInterval(function() {
  // cap at 200 sprites
  if (memes.length > 200) {
    return;
  }

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

// draw
draw();
requestAnimationFrame(draw);
