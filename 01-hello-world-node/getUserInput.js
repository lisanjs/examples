const getUserInput = (message, cb) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(message, data => {
    cb(data);

    readline.close();
  });
};

module.exports = { getUserInput };
