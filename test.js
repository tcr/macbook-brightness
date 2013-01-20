var exec = require('child_process').exec;

var n = 0;

function setBrightness (n, next) {
  exec('./displaybrightness ' + n, next || function () { });
}

function getBrightness (next) {
  exec('./displaybrightness ' + n, function (err, stdout) {
    next && next(err, parseFloat(stdout));
  });
}

function next () {
  n += 0.01;
  setBrightness(n, function (err) {
    getBrightness(function (err, b) {
      console.log(b);
      if (n < 1.0) {
        setTimeout(next, 10);
      }
    })
  })
}

//next();

process.stdin.resume();
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

var clr = null;

// on any data into stdin
process.stdin.on('data', function (key) {
  // ctrl-c ( end of text )
  if (key === '\u0003') {
    process.exit();
  }

  //if (key == 'f') {
  on = true;
  setBrightness(1.0);
  if (clr) {
    clearTimeout(clr);
  }
  clr = setTimeout(setBrightness.bind(null, 0), 80);

  // write the key to stdout all normal like
  //process.stdout.write( key );
});

setBrightness(0, function () {

});