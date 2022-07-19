// required packages
const inquirer = require("inquirer")
const fs = require("fs")
const fetch = require("node-fetch")

const questions = [
    "What is the title of your project?",
    "Briefly describe your project",
    "How do you install this project?",
    "How do you use this project?",
    "Please enter the url of the deployed application", 
    "Please enter your github username", 
    "Please provide your email address",
    "Who would you like to include in the credits?",
    "Please detail how others can contribute",
    "Please provide tests for the program",
    "What license would you like to use?"
];


//These functions retrieve license text and append them based on user choice
const mitL = function () {
    fetch('https://api.github.com/licenses/mit')
        .then(response => response.json())
        .then(data => {
            fs.appendFile(`README.md`, `\n${data.body}`, err => err ? console.error(err) : console.log("MIT License written to file"))
        }
        )
}

const apacheL = function () {
    fetch('https://api.github.com/licenses/apache-2.0')
        .then(response => response.json())
        .then(data => {
            fs.appendFile(`README.md`, `\n${data.body}`, err => err ? console.error(err) : console.log("Apache License written to file"))
        }
        )
}

const gplL = function () {
    fetch('https://api.github.com/licenses/GPL-3.0')
        .then(response => response.json())
        .then(data => {
            fs.appendFile(`README.md`, `\n${data.body}`, err => err ? console.error(err) : console.log("GPL License written to file"))
        }
        )
}

//array of licenses
const licenses = ["MIT", "Apache", "GPLv3", "None"]


function init() {
    inquirer
        .prompt([
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
                name: 'deployed',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'github',
            },
            {
                type: 'input',
                message: questions[6],
                name: 'email',
            },
            {
                type: 'input',
                message: questions[7],
                name: 'credits',
            },
            {
                type: 'input',
                message: questions[8],
                name: 'contribute',
            },
            {
                type: 'input',
                message: questions[9],
                name: 'test',
            },
            {
                type: 'list',
                message: questions[10],
                choices: licenses,
                name: 'license',
            }

        ]).then(function (response) {
            //readme.md creation and appendation
            const badge = function(){
                if (response.license == "MIT") {
                    return "![License badge](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen)"
                }
                else if (response.license == "Apache") {
                    return "![License badge](https://img.shields.io/static/v1?label=License&message=Apache-2.0&color=brightgreen)"
                }
                else if (response.license == "GPLv3") {
                    return "![License badge](https://img.shields.io/static/v1?label=License&message=GPLv3&color=brightgreen)"
                }}
                

            fs.writeFile(`README.md`, 
`# ${response.title}
${badge()}

## Description

${response.description}


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)


## Installation

${response.installation}

## Usage

${response.usage}

${response.deployed}

## Credits

${response.credits}

## Contribution

${response.contribute}

## Tests

${response.test}

## Questions

[https://github.com/${response.github}](https://github.com/${response.github})

[${response.email}](mailto:${response.email})


## License`, err => err ? console.error(err):console.log("written to file"))

            //license badges based on selection

            if (response.license == "MIT") {
                mitL()
            } else if (response.license == "Apache") {
                apacheL()
            } else if (response.license == "GPLv3") {
                gplL()
            }
        })

}

// Function call to initialize app
init();
