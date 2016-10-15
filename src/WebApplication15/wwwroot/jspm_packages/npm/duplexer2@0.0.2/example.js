/* */ 
var stream = require('readable-stream');
var duplexer2 = require('../duplexer2@0.0.2');
var writable = new stream.Writable({objectMode: true}),
    readable = new stream.Readable({objectMode: true});
writable._write = function _write(input, encoding, done) {
  if (readable.push(input)) {
    return done();
  } else {
    readable.once("drain", done);
  }
};
readable._read = function _read(n) {};
writable.once("finish", function() {
  setTimeout(function() {
    readable.push(null);
  }, 500);
});
var duplex = duplexer2(writable, readable);
duplex.on("data", function(e) {
  console.log("got data", JSON.stringify(e));
});
duplex.on("finish", function() {
  console.log("got finish event");
});
duplex.on("end", function() {
  console.log("got end event");
});
duplex.write("oh, hi there", function() {
  console.log("finished writing");
});
duplex.end(function() {
  console.log("finished ending");
});