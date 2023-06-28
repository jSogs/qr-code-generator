/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

const prompt= inquirer.createPromptModule();


const question = [
    {
        type: 'input',
        name: 'url',
        message: 'Enter the URL:',
    },
    {
        type: 'input',
        name: 'fileName',
        message: 'Enter a preferred file name for the qr-code:',
        default(){
            var rand = Math.floor((Math.random()*4));
            var fileNameArray = ['qr_code','qr_code_img','qrCode','qrGen_img'];
            return fileNameArray[rand];
        }
    }
];
const options= {
    margin: 1,
    parse_url: true
};

prompt(question).then((answers)=>{
    qr.image(answers.url,options).pipe(fs.createWriteStream(answers.fileName+'.png'));
});
