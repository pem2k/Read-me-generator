// TODO: Include packages needed for this application
const inquirer = require("inquirer")
const fs = require("fs")

// TODO: Create an array of questions for user input
const questions = ["What is the title of your project?", 
                   "Briefly describe your project", 
                   "How do you install this project?", 
                   "How do you use this project?", 
                   "Who would you like to include in the credits?", 
                   "What license would you like to use?"];

const licenses = [""]

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
                name: 'description',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'installation',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'usage',
            },
            {
                type: 'input',
                message: questions[4],
                name: 'credits',
            },
            {
                type: 'list',
                message: questions[5],
                choices: ["MIT", "Apache", "GPLV3"],
                name: 'license',
            }
           
        ]).then(function(response){
            fs.writeFile(`${response.filename}.md`, `# ${response.title}\n\n`, err => err ? console.error(err):console.log("File created and Title written to file") )

            fs.appendFile(`${response.filename}.md`, `## Description\n${response.description}\n\n`, err => err ? console.error(err):console.log("Table of contents written to file") )

            fs.appendFile(`${response.filename}.md`, `## Table of Contents\n - [Installation](#installation)\n - [Usage](#usage)\n - [Credits](#credits)\n - [License](#license)\n\n`, err => err ? console.error(err):console.log("Table of contents written to file") )

            fs.appendFile(`${response.filename}.md`, `## Installation\n ${response.installation}\n`, err => err ? console.error(err):console.log("Installation written to file") )

            fs.appendFile(`${response.filename}.md`, `## Usage\n ${response.usage}\n\n`, err => err ? console.error(err):console.log("Usage written to file") )

            fs.appendFile(`${response.filename}.md`, `## Credits\n ${response.credits}\n\n`, err => err ? console.error(err):console.log("Credits written to file") )

            fs.appendFile(`${response.filename}.md`, `## license\n ${response.license}\n\n`, err => err ? console.error(err):console.log("License written to file") )
        })
        
}

// Function call to initialize app
init();
