require('./error-config.js');
const skewedNormalDistribution = require('./skewed-normal-distribution.js');
const quotes = require('./quotes.json');

const quoteLength = quotes.length;
const logTypes = ['trace', 'debug', 'info', 'warn', 'error'];

const interval = setInterval(() => {
  setTimeout(() => {
    const quoteID = Math.floor(Math.random()*quoteLength);
    const level = logTypes[Math.floor(Math.random()*5)];
    const log = {
      level,
      message: quotes[quoteID].message,
      author: quotes[quoteID].author,
      nested: {
        id: Math.round(Math.random()*1000000),
        color: ['red', 'green', 'blue'][Math.floor(Math.random()*3)],
        array: ['a', 'b', 'c', 'd', 'e'],
      },
      onPurpose: [true, false][Math.round(Math.random())],
    };
    if (level === 'error') {
      const diceRoll = Math.random();
      if(diceRoll > 0.85) {
        log.message = 'Timeout. Cant reach external api';
        log.duration = Math.round(skewedNormalDistribution(100, 1200, 3.14))/10;
        delete log.author;
        delete log.nested;
        delete log.onPurpose;
      } else if(diceRoll < 0.7) {
        log.level = logTypes[Math.floor(Math.random()*4)];
      }
    }
    const times = Math.floor(skewedNormalDistribution(0, 10, 3));
    for(_ of Array(times)) {
      console[level](JSON.stringify(log));
    }
  }, Math.random()*4000);
}, 1000);

process.on('SIGTERM', () => {
  clearInterval(interval);
});

process.on('SIGINT', () => {
  clearInterval(interval);
});
