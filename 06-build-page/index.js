const fs = require('fs');
const path = require('path');
const assets = path.join(__dirname, 'assets');
const dir = path.join(__dirname, 'project-dist/assets');
const template = path.join(__dirname, 'template.html');
const index  = path.join(__dirname,'project-dist', 'index.html');

fs.mkdir(path.join(__dirname, 'project-dist'), 
  {recursive: true},  err => {
    if (err) throw err;
  }
);

function copyDir(src,srcCopy) {
  fs.rm(srcCopy, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }     
    fs.mkdir(srcCopy, { recursive: true } ,(err) => 
      err && console.error(err));
    fs.readdir(src, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      for(let file of files) {
        const pat = path.join(src, file.name);
        const patCopy = path.join(srcCopy, file.name);
        console.log(pat);
        if(file.isFile()) {
          fs.copyFile(pat, patCopy, (error)=> 
            error&&console.error(error)
          );
        }
        if (file.isDirectory()) copyDir(pat, patCopy);
      }
    });
  });
}
copyDir(assets,dir);

const styleCss = fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'), (err) => 
  err && console.error(err) 
);

fs.readdir(path.join(__dirname,'styles'), {withFileTypes:true}, (err, files) => {
  if(err) {console.error(err);}
  for(let file of files) {
    if(file.isFile()) {
      const pathF = path.join(__dirname,'styles',file.name);
      const typeFile = file.name.split('.')[1];
      if (typeFile === 'css') {
        const readableStream = fs.createReadStream(pathF, 'utf-8');
        let variab='';
      
        readableStream.on('data', (a) => { variab+=a;
        });
          
        readableStream.on('end', () => { styleCss.write(variab);
          console.log('');
        });
        readableStream.on('error', () => {
          console.log('error');
        });
      }  
    }
  }
});

fs.copyFile(template, index, (err) => err && console.error(err));
fs.readFile( template,'utf-8', (err,data ) => {
  if(err) console.error(err);
  const tagFile =  data.match(/{{\w+}}/gm);
  for (let tag of tagFile) {
    const tpath = path.join(__dirname,'components', `${tag.slice(2, -2)}.html`);
    fs.readFile(tpath, 'utf-8', (err, tags) => {
      if (err) return console.error(err);
      data = data.replace(tag, tags);
      fs.rm(index, { recursive: true, force: true }, (err) => {
        if (err) return console.error(err);
        const indexFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
        indexFile.write(data);
      });
    });
  }
});
  

