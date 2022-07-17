// required packages
const inquirer = require("inquirer")
const fs = require("fs")
const fetch = require("node-fetch")

const questions = [
    "What is the title of your project?",
    "Briefly describe your project",
    "How do you install this project?",
    "How do you use this project?",
    "Who would you like to include in the credits?",
    "What license would you like to use?"];


//These functions retrieve license text and append them based on user choice
const mitL = function () {
    fetch('https://api.github.com/licenses/mit')
        .then(response => response.json())
        .then(data => {
            console.log(data.body)
            fs.appendFile(`README.md`, `${data.body}`, err => err ? console.error(err) : console.log("MIT License written to file"))
        })

}

const apacheL = function () {
    fetch('https://api.github.com/licenses/apache-2.0')
        .then(response => response.json())
        .then(data => {
            fs.appendFile(`README.md`, `${data.body}`, err => err ? console.error(err) : console.log("Apache License written to file"))
        })

}

const gplL = function () {
    fetch('https://api.github.com/licenses/GPL-3.0')
        .then(response => response.json())
        .then(data => {
            fs.appendFile(`README.md`, `${data.body}`, err => err ? console.error(err) : console.log("GPL License written to file"))
        })

}

//array of licenses
const licenses = ["MIT", "Apache", "GPLV3"]


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
                name: 'credits',
            },
            {
                type: 'list',
                message: questions[5],
                choices: licenses,
                name: 'license',
            }

        ]).then(function (response) {
            fs.writeFile(`README.md`, `# ${response.title}\n\n`, err => err ? console.error(err) : console.log("File created and Title written to file"))

            if (response.license == "MIT") {
                fs.appendFile(`README.md`, `![License Badge](https://img.shields.io/badge/license-MIT-green)\n\n`, err => err ? console.error(err) : console.log("File created and Title written to file"))
            }
            else if (response.license == "Apache") {
                fs.appendFile(`README.md`, `![License Badge](https://img.shields.io/badge/License-Apache%202.0-green)\n\n`, err => err ? console.error(err) : console.log("File created and Title written to file"))
            }
            else {
                fs.appendFile(`README.md`, `![License Badge](https://img.shields.io/badge/License-GPL%203-green)\n\n`, err => err ? console.error(err) : console.log("File created and Title written to file"))
            }

            fs.appendFile(`README.md`, `## Description\n${response.description}\n\n`, err => err ? console.error(err) : console.log("Table of contents written to file"))

            fs.appendFile(`README.md`, `## Table of Contents\n - [Installation](#installation)\n - [Usage](#usage)\n - [Credits](#credits)\n - [License](#license)\n\n`, err => err ? console.error(err) : console.log("Table of contents written to file"))

            fs.appendFile(`README.md`, `## Installation\n ${response.installation}\n`, err => err ? console.error(err) : console.log("Installation written to file"))

            fs.appendFile(`README.md`, `## Usage\n ${response.usage}\n\n`, err => err ? console.error(err) : console.log("Usage written to file"))

            fs.appendFile(`README.md`, `## Credits\n ${response.credits}\n\n`, err => err ? console.error(err) : console.log("Credits written to file"))

            fs.appendFile(`README.md`, `## license\n ${response.license}\n\n`, err => err ? console.error(err) : console.log("License written to file"))

            if (response.license == "MIT") {

                mitL()

            } else if (response.license == "Apache") {

                apacheL()

            } else {

                gplL()

            }
        })

}

// Function call to initialize app
init();
