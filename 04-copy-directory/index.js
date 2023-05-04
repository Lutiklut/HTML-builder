const fs =require('fs');
const path =require('path');

const fileOrigin= path.join(__dirname,'files');
const fileCopy= path.join(__dirname,'files-copy');

function copyDir(src,srcCopy) {
  fs.rm(srcCopy, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }     
    fs.mkdir(fileCopy, { recursive: true } ,(err) => 
      err && console.error(err));
    fs.readdir(src, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      for(let file of files) {
        const pat = path.join(src, file.name);
        const patCopy = path.join(srcCopy, file.name);
        if(file.isFile()) {
          fs.copyFile(pat, patCopy, (error)=> 
            error&&console.error(error)
          );
          if (file.isDirectory()) copyDir(pat, patCopy);
        }
      }
    });
  });
}
copyDir(fileOrigin,fileCopy);