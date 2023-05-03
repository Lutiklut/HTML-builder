
const path = require('path');
const fs = require('fs');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readableStream.on('data', (a) => {
  console.log(a.toString());
});

readableStream.on('end', () => {
  console.log('');
});
readableStream.on('error', () => {
  console.log('error');
});