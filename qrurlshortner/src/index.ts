import inquirer from 'inquirer';
import tinyurl from 'tinyurl-api';
import * as qr from 'qr-image';
import fs from 'node:fs';
import {v4 as uuidv4} from 'uuid';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {exec} from 'child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getOption():Promise<string>{

    async function initoption():Promise<string>{
        const {option}=await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select an option:',
                choices: ['Generate a tiny URL','Generate a QR Code'],
            },
        ])

        return option as string;
    }
    return await initoption() as unknown as string;
}

async function generateTinyURL():Promise<void>{
    async function generate():Promise<void>{
        const {url}=await inquirer.prompt([
            {
                type:'input',
                name:'url',
                message:'enter the url you want to generate Tiny URL',
            }
        ])
        const finalURL:string=url as string;
        try{
        const tinyURL:string=await tinyurl(finalURL);
            console.log(`The generate tiny URL is:${tinyURL}`);
        }catch(e){
            console.log("Something went wrong!")
        }
        
    }
    await generate();
}

async function generateQRCode():Promise<void>{
    async function generate():Promise<void>{
        const {url}=await inquirer.prompt([
            {
                type:'input',
                name:'url',
                message:'enter the url you want to generate QR Code',
            }
        ])
        const finalURL:string=url as string;
        try{
            let uuid=uuidv4();
            exec('mkdir generated',{cwd:'./dist'},(err)=>{})
            const generatedpath = path.join(__dirname, 'generated', `${uuid}.png`);
            const qr_png= qr.image(finalURL, { type: 'png' });
            await qr_png.pipe(fs.createWriteStream(generatedpath,'utf-8'));
            console.log(`Your qr is generated in the folder /generated and your file name is ${uuid}.png`);
        }catch(e){
            console.log(e);
            console.log("Something went wrong!")
        }
    }
    await generate();
}

async function processOption(option:string):Promise<void>{
    switch(option){
        case 'Generate a tiny URL':await generateTinyURL();
            break;
        case 'Generate a QR Code':await generateQRCode();
            break;
        default:console.log("Sorry cannot process your request now");
    }
}

async function main():Promise<void>{
    let result:string=await getOption() as unknown as string;
    await processOption(result);
}

main();