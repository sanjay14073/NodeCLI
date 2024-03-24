import inquirer from "inquirer";
import * as generator from 'generate-password';

async function inputLengthAndPassword():Promise<number[]>{
        let nums:number[]=[];
        const {length}=await inquirer.prompt([{
            type:'input',
            name:'length',
            message:'Enter the length of the password you want enter',
        }])
        const {noOfPassword}=await inquirer.prompt([{
            type:'input',
            name:'noOfPassword',
            message:'Enter the number of the password you want to generate', 
        }])
        nums.push(length);
        nums.push(noOfPassword);
        return nums as unknown as number[];
}

function generatePassword(length:number,noOfPassword:number):void{
        console.log("Here are few password suggestions")
        
        let passwords=generator.generateMultiple(noOfPassword,{length:length,strict:true,uppercase:true,symbols:true,lowercase:true,numbers:true,exclude:''});
        
        for(let i=0;i<passwords.length;i++){
            console.log(passwords[i]);
        }
        
}
async function main(){
    let nums=await inputLengthAndPassword()
    generatePassword(nums[0],nums[1]);
}

main();