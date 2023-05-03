const fs = require('fs');
const path = require('path');
const readline = require('readline');

const writel = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'write.txt'));
writel.write('Write');

writel.on('line', (inp) => {
  if (inp.trim().toLowerCase() === 'exit') {
    writel.close();
   
  }
  else {writeStream.write(`${inp}\n`)};

});
writel.on('close',() => {
  console.log('End'); 
  process.exit();
});

writel.on('SIGINT', () => {
  console.log('End');
  process.exit();
});
  


