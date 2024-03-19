import inquirer from "inquirer";
import {execSync} from 'child_process';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
async function getInput():Promise<string>{
    const {url}=await inquirer.prompt([
        {
            type:'input',
            name:'url',
            message:'enter the input URL'
        }
    ])
    return url as unknown as string;
}

function processInput(url:string):void{
    execSync(`echogarden transcribe ${url} result.txt`);    
}

function convertToPDF():void{
    try{
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('result.pdf'));
        const text = fs.readFileSync('result.txt', 'utf-8');
        doc.text(text);
        doc.end();
    }catch(e){
        console.log(e);
    }
}

async function main() {
    const url:string=await getInput();
    processInput(url);
    convertToPDF();
}

main()
