// TODO: Include packages needed for this application
const inquirer = require("inquirer")
const fs = require("fs")

// TODO: Create an array of questions for user input
const questions = ["What is your project title?", 
                   "Briefly describe your project", 
                   "How do you install this project?", 
                   "How do you use this project?", 
                   "Who would you like to include in the credits?", 
                   "What license would you like to use?"];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What would you like to name your file?",
                name: 'filename',
            },
            {
                type: 'input',
                message: questions[0],
                name: 'title',
            },
            {
                type: 'input',
                message: questions[1],
                name: 'installation',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'usage',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'credits',
            },
            {
                type: 'input',
                message: questions[4],
                name: 'license',
            }
        ]).then(function(response){
            fs.writeFile(`${response.filename}.md`, `# ${response.title}\n`, err => err ? console.error(err):console.log("written to file") )
            fs.appendFile(`${response.filename}.md`, `## Installation\n ${response.installation}\n`, err => err ? console.error(err):console.log("written to file") )
            fs.appendFile(`${response.filename}.md`, `## Usage\n ${response.usage}\n`, err => err ? console.error(err):console.log("written to file") )
            fs.appendFile(`${response.filename}.md`, `## Credits\n ${response.credits}\n`, err => err ? console.error(err):console.log("written to file") )
            fs.appendFile(`${response.filename}.md`, `## license\n ${response.license}\n`, err => err ? console.error(err):console.log("written to file") )
        })
        
}

// Function call to initialize app
init();
