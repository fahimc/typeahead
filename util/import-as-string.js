const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const nodeSass = require('node-sass');
const glob = require('glob');


const ImportAsString = {
    init(){
        if(process.argv.length !== 4) {
            console.log('you need to provide the src and output')
        }else{
            const input = process.argv[2];
            const output = process.argv[3];
            console.log('import-as-string - ', `input:${input}`,`output:${output}`)
            this.readInputFileList(input,output);
        }
    },
    readInputFileList(input,output){
        glob(input,{},(error, fileList)=>{
            fileList.forEach((filePath)=>{
                this.convertFile(filePath,output);
            });
        })
    },
    convertFile(input,output){
        if(fs.lstatSync(input).isDirectory())return;  
        fs.readFile(input,'utf8',(error,content)=>{
            const inputPath = input.replace(/(.*[\\/])[^\/]+$/igm,"$1");
            const regEx = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s](.*([@\w_-]+)\.(scss|css))["'\s].*;$/igm;
            const matches = content.match(regEx);
            if(matches){
                matches.forEach((m)=>{
                    const prop = m.split(' as ')[1].split(' from ')[0]
                    const relativePath = m.split(' from ')[1].replace(/[\"\'\;]/igm,'');
                    const sassPath = path.resolve(inputPath,relativePath);

                    nodeSass.render({
                        file: sassPath,
                    },
                    (sassError, result)=>{
                        content = content.replace(m,`const ${prop} = \`${result.css}\``);
                        this.writeFile(path.resolve(output,input),content, ()=>{});
                    });
                    
                });

            }
          })
    },
    writeFile(path, contents, cb) {
        mkdirp(getDirName(path), function (err) {
          if (err) return cb(err);
      
          fs.writeFile(path, contents, cb);
        });
      }
}.init();