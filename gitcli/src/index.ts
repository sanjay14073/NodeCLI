import { exec } from "child_process";
import inquirer from 'inquirer';

function showAvaiableOptions():void{
    console.log("Hey welcome to gitcli what would you like to do");
    console.log("1.Clone a repository");
    console.log("2.Initialise a repository");
    console.log("3.Add and Commit Changes");
    console.log("4.Push Changes");
    console.log("5.Pull Changes");
}

function TakingInput():string{
    async function TakeCLIInput():Promise<string>{
        const {option}=await  inquirer.prompt([
            {
              type: 'list',
              name: 'option',
              message: 'Select an option:',
              choices: ['Clone a repository','Initialise a repository' ,'Commit changes', 'Push changes','Pull changes'],
            },
        ]);
        return option as string;
    }
    let result=TakeCLIInput();
    return result as unknown as string;
}

function CloneRepository(){
    async function Execcmd(){
        const {url}=await inquirer.prompt([{
            type:'input',
            name:'url',
            message:'Enter the url you want to clone'
        }]);
        const finalurl=url as string;
        exec(`git clone ${finalurl}`,(err, stdout, stderr) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Repository cloned successfully:', stdout);
            }
          });
    }
    Execcmd();
}
function InitialiseRepostory(){
    async function Execcmd(){
        const {url}=await inquirer.prompt([{
            type:'input',
            name:'url',
            message:'Enter the path of the repository you want to initialize repo'
        }]);
        const path=url as string;
        exec(`cd ${path} && git init`,(err, stdout, stderr) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Repository initialised successfully:', stdout);
            }
          });
    }
    Execcmd();
}
function CommitChanges(){
    async function Execcmd(){
        const {url}=await inquirer.prompt([{
            type:'input',
            name:'url',
            message:'Enter the path of the repository you want to add and commit changes'
        }]);
        const path=url as string;
        exec(`git add . && git commit -m "initial commit"`,{ cwd: path },(err, stdout, stderr) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Repository commited successfully:', stdout);
            }
          });
    }
    Execcmd();
}
function PushChanges(){
    async function Execcmd(){
        const {url}=await inquirer.prompt([{
            type:'input',
            name:'url',
            message:'Enter the path of the repository you want to push changes'
        }]);
        const path=url as string;

        exec(`git push origin main`,{ cwd: path },(err, stdout, stderr) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Repository pushed to main successfully:', stdout);
            }
          });
    }
    Execcmd();

}
function PullChanges(){
    async function Execcmd(){
        const {url}=await inquirer.prompt([{
            type:'input',
            name:'url',
            message:'Enter the path of the repository you want to add and commit changes'
        }]);
        const path=url as string;
        exec(`git pull origin main`,{ cwd: path },(err, stdout, stderr) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Repository pulled from main successfully:', stdout);
            }
          });
    }
    Execcmd();

}
async function ProcessingInput(option:string):Promise<void>{
    switch (option){
        case 'Clone a repository':CloneRepository();
            break;
        case 'Initialise a repository':InitialiseRepostory();
            break;
        case 'Commit changes':CommitChanges();
            break;
        case 'Push changes':PushChanges();
            break;
        case 'Pull changes':PullChanges();
            break;
        default:console.log("enter a valid option break");
    }
}

async function main():Promise<void>{
    showAvaiableOptions();
    let result:string=await TakingInput();
    await ProcessingInput(result);
}

main();

