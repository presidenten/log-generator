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
    };
    if (level === 'error') {
      const diceRoll = Math.random();
      if(diceRoll > 0.85) {
        log.message = 'Timeout. Cant reach external api';
        delete log.author;
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
