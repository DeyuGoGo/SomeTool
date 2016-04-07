var fs = require('fs');
var mkdirp = require('mkdirp');

var args = process.argv.slice(2);
var sources = ['drawable-hdpi' , 'drawable-mdpi','drawable-xhdpi','drawable-xxhdpi','drawable-xxxhdpi'];
sources.forEach(function (val, index, array) {
  mkdirp(args[1]+'/'+val+'/',function(err){});
  copyFile('./'+val+'/'+args[0],args[1]+'/'+val+'/'+args[0]);
});

function copyFile(source, target,cb) {
  var cbCalled = false;
  console.log(source);
  console.log(target);
  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      // cb(err);
      cbCalled = true;
    }
  }
}
