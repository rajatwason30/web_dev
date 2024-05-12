#!/usr/bin/env node

let content = process.argv.slice(2);
let fs = require("fs");
const os = require('os');

const platform = os.platform();
let lineEnding;
if(platform==='darwin' || platform==='linux'){
    lineEnding="\n";
}else if(platform==='win32'){
    lineEnding="\r\n"
}

let flags = [];
let files = [];

for (let i = 0; i < content.length; i++) {
  // "-s"
  if (content[i].startsWith("-")) 
    flags.push(content[i]);
  else
    files.push(content[i]);
}
// for files output
let fileKaData="";//imp to initiallize as string
for (let i = 0; i < files.length; i++) {
  fileKaData += fs.readFileSync(files[i]);
  if(i<files.length-1)
    fileKaData += lineEnding;
}
// console.log(fileKaData.split("\r\n"));
//for doing changes acc to flags
if(flags.includes("-s"))
  fileKaData=flagS(fileKaData);

if(flags.includes("-n") && flags.includes("-b"))
{
  if(flags.indexOf("-b")<flags.indexOf("-n"))
    fileKaData=flagB(fileKaData);
  else
    fileKaData=flagN(fileKaData);
}
else if(flags.includes("-b"))
  fileKaData=flagB(fileKaData);
else if(flags.includes("-n"))
  fileKaData=flagN(fileKaData);
console.log(fileKaData);

function flagS(input)
{
    input=input.split(lineEnding);
    let data="";
    for(let i=0;i<input.length-1;i++)
    {
        if(input[i].length>0)
        {
            data+=input[i]+"\r\n";
            if(input[i+1].length==0)
            {
                data+="\r\n";
                i++;
            }
        }
    }
    if(input[input.length-1].length>0)
        data+=input[input.length-1];
    return data;
}
function flagB(input)
{
    input=input.split(lineEnding);
    let data="";
    let ct=1;
    for(let i=0;i<input.length;i++)
    {
        if(input[i].length>0)
        {
            data+=`${ct}. ${input[i]}\n`;
            ct++;
        }
        else
            data+="\n";
    }
    return data;
}
function flagN(input)
{
    input=input.split(lineEnding);
    let data="";
    let ct=1;
    for(let i=0;i<input.length;i++)
    {
        data+=`${ct}. ${input[i]}\n`;
        ct++;
    }
    return data;
}
// node Wcat.js -s -b -n f1.txt