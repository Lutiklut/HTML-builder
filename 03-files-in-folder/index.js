const fs = require('fs');
const path =require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for(let file of files) {
    if(file.isFile()) {
      
      const nameF = file.name.split('.')[0];
      const typeFile = file.name.split('.')[1]; 
      fs.stat(path.join(__dirname, 'secret-folder', file.name),(error, file)=> {
        if (error) throw error;
        const sizeFile= file.size/1024;
        console.log(`${nameF} - ${typeFile} - ${sizeFile}kb`);
    
      });
    }
  }
});

