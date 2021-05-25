const fs=require("fs");
const path=require("path");
let extension=require("./utils.js")
let folderPath = "./Downloads";

function getFolderPath(extensionName,folderPath)
{
    //checks of a folder exists for given extension
    // if exists returns a path to that folder
    // else creates a new folder and returns a path to that folder
    let fileFolderPath=folderPath;
    for(let key in extension)
    {
        if(extension[key].includes(extensionName))
        {
            fileFolderPath+="/"+key;
            break;
        }
    }
    if(!fs.existsSync(fileFolderPath))
    {
        //create new folder and then return this
        fs.mkdirSync(fileFolderPath);
    }
    return fileFolderPath;
}

function sortFolder(folderPath)
{
    fileList=fs.readdirSync(folderPath);
    for(let i=0;i<fileList.length;i++)
    {
        let filename=fileList[i];
        let extensionName=path.extname(filename);
        let isDirectory=fs.lstatSync(folderPath+"/"+filename).isDirectory();
        if(isDirectory)
        {
            //recursively sort other folders within downloads folder 
            //a new folder. Sort this folder as well
            let nextFolderPath=folderPath+"/"+filename;
            sortFolder(nextFolderPath);
        }
        else
        {
            let fileFolderPath=getFolderPath(extensionName,folderPath);
            //move files
            let srcpath=folderPath+"/"+filename; //"./Downloads/abc.jpg"
            let dstpath=fileFolderPath+"/"+filename;
            fs.copyFileSync(srcpath,dstpath);
            fs.unlinkSync(srcpath);
        }
    }
}

sortFolder(folderPath);