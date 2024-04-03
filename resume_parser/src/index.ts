import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as pdf from 'text-from-pdf';
import { readFileSync } from "fs";
import { DocxCounter, OdtCounter, PdfCounter, PptxCounter } from "page-count";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const url = join("./resume_001.pdf");

async function processResume(res:string) {
    try{
    const pdfBuffer = readFileSync(url);
    const pagesPdf = await PdfCounter.count(pdfBuffer);
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: pagesPdf,
     };
    let result:string|undefined=await pdf.pdfToText(url,options);
    let resumeExtract=result?.toLowerCase();
    let skills=res.split(',');
    let scoreOfResume=0;
    let count=0;
    for(let i=0;i<skills.length;i++){
        if(resumeExtract?.indexOf(skills[i].toLowerCase())!=-1){
            count+=1;
        }
    }
    if(count!=0){
        scoreOfResume=(count/skills.length)*100;
    }
    if(scoreOfResume<=50){
        console.log("Your Profile Does not match");
    }else{
        console.log(`Your Profie has a good score of ${scoreOfResume}`);
    }
    
    }catch(e){
        console.log(e);
    }
}
async function requiredSkills():Promise<string>{
    const { skills }=await inquirer.prompt([{
        "type":"input",
        "message":"enter the skills requried (Seperated by ,)",
        "name":"skills"
    }])
    return skills as unknown as string;
}

async function main() {
    let res:string=await requiredSkills();
    await processResume(res);
}

main();