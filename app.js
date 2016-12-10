var fs = require('fs');

var length = 0;

var bots = {};

function parseCommand(line) {
    var l = line;

    var result = (/value (\d+) goes to (bot \d+)/g).exec(l);

    if (result) {
        getValue(result[2], parseInt(result[1]));
    } else {
        result = (/(bot \d+) gives low to (\w+ \d+) and high to (\w+ \d+)/g).exec(l);
        giveValue(result[1], result[3], result[2]);
    }
}

function giveValue(bot, highDest, lowDest) {

    if (! bots[bot]) {
        bots[bot] = { high: null, low : null };
    }

    bots[bot].give = function() {
        var high = bots[bot].high;
        var low = bots[bot].low;
        bots[bot] = { high: null, low : null };

        getValue(highDest, high);
        getValue(lowDest, low);
    };

    give(bot);
}

function getValue(bot, value) {
    if (! bots[bot]) {
        bots[bot] = { high: null, low : null };
    }

    if (value > bots[bot].high) {
        bots[bot].low = bots[bot].high;
        bots[bot].high = value;
    } else {
        bots[bot].low = value;
    }

    give(bot);
}

function give(bot) {
    if (bots[bot].high != null && bots[bot].low != null && bots[bot].give) {

        if (bots[bot].high == 61 && bots[bot].low == 17) {
            console.log("Part 1: " + bot);
        }

        bots[bot].give();
    }
}

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var lines = data.split('\n');
  
  lines.forEach(function(e,i) {
      parseCommand(e.trim());
  });

  console.log('Part 2: ' + (bots['output 0'].high * bots['output 1'].high * bots['output 2'].high));

});