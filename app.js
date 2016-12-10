var fs = require('fs');

var length = 0;
function parseCommand(line) {
    var l = line;
    
}

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var lines = data.split('\n');
  
  lines.forEach(function(e,i) {
      parseCommand(e.trim());
  });

});