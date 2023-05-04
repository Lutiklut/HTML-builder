const fs = require('fs');
const path = require('path');

const pathStyle=path.join(__dirname,'styles');
const oneStyle = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));

fs.readdir(path.join(pathStyle), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for(let file of files) {
    if(file.isFile()) {
      const pathF = path.join(pathStyle,file.name);
      const typeFile = file.name.split('.')[1];
      if (typeFile === 'css') {
        const readableStream = fs.createReadStream(pathF, 'utf-8');
        let variab='';
      
        readableStream.on('data', (a) => { variab+=a;
        });
          
        readableStream.on('end', () => { oneStyle.write(variab);
          console.log('');
        });
        readableStream.on('error', () => {
          console.log('error');
        });
      }  
    }
  }
});
  