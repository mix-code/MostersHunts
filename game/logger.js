const chalk = require('chalk');

const toSystem = print => console.log(chalk.blue(print));
const toSubSystem = print => console.log(chalk.yellow(print));
const toPlayer = print => console.log(chalk.green(print));
const byPlayer = print => console.log(chalk.green(print));
const toMonster = print => console.log(chalk.red(print));
const byMonster = print => toMonster(print);
const toConsole = print => console.log(print);


module.exports = { 
    toSystem,
    toSubSystem,
    toPlayer,
    byPlayer,
    toMonster,
    byMonster,
    toConsole,
};