const fs=require("fs");
const os = require('os');

const platform = os.platform();
let lineEnding;
if(platform==='darwin' || platform==='linux'){
    lineEnding="\n";
}else if(platform==='win32'){
    lineEnding="\r\n"
}

let filekadata=fs.readFileSync("./f1.txt","utf-8");

function flagS(input)
{
    input=input.split(lineEnding);
    let data="";
    for(let i=0;i<input.length-1;i++)
    {
        if(input[i].length>0)
        {
            data+=input[i]+"\n";
            if(input[i+1].length==0)
            {
                data+="\n";
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
        {
            data+="\n";
        }
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
datas=flagS(filekadata);
datab=flagB(filekadata);
datan=flagN(filekadata);
console.log(datas);
console.log(datab);
console.log(datan);