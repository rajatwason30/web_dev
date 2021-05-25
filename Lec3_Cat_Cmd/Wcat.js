let content = process.argv.slice(2);
let fs = require("fs");

let flags = [];
let files = [];

for (let i = 0; i < content.length; i++) {
  // "-s"
  if (content[i].startsWith("-")) {
    flags.push(content[i]);
  } else {
    files.push(content[i]);
  }
}
// console.log(flags);
// console.log(files);
// for files output
let filesKaData = "";
for (let i = 0; i < files.length; i++) {
  // f1.txt => f2.txt
  filesKaData += fs.readFileSync(files[i]);
  filesKaData += "\r\n";
}
console.log(filesKaData);