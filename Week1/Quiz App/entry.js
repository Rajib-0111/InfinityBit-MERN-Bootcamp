const fs = require("fs");
const ps = require("prompt-sync");
const chalk = require("chalk");

const prompt = ps({ sigint: true });

const filePath = "./question.json";

let questions = [];

class question {
  constructor(string) {
    this.name = string;
    this.options = [];
  }
  entryoption(option) {
    this.options.push(option);
  }
  setkey(answer) {
    this.answerKey = answer;
  }
}

function display() {
  if (questions.length === 0) {
    console.log(chalk.bgRed("No Question Is There..."));
    return;
  }
  for (let i = 0; i < questions.length; i++) {
    console.log(`Question No ${i + 1}`);
    console.log("Question : ", questions[i].name);
    for (let j = 0; j < questions[i].options.length; j++) {
      console.log(`Option ${j + 1} : ${questions[i].options[j]}`);
    }
    console.log("Correct Option : ", questions[i].answerKey);
    console.log("---------------------------------------------------");
  }
  return;
}

function isqpexist(qpno) {
  qpno -= 1;
  for (let i = 0; i < questions.length; i++) {
    if (i === qpno) {
      return i;
    }
  }
  return -1;
}

function isnumber(string) {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 48 || string.charCodeAt(i) > 57) {
      return false;
    }
  }
  return true;
}

function validateoption(option) {
  if (option.length !== 1) {
    return false;
  }
  if (option.charCodeAt(0) >= 49 && option.charCodeAt(0) <= 52) {
    return true;
  }
  else {
    return false;
  }
}

function menu() {
  let choiceValue;
  console.clear();
  console.log("-----------------------------------------");
  console.log("\t\t M E N U");
  console.log("-----------------------------------------");
  console.log("1. Add Question\n2. See All Question\n3. Delete A Question\n4. Exit");
  console.log("-----------------------------------------");
  choiceValue = parseInt(prompt("Enter Your Choice : "));
  console.log("-----------------------------------------");
  if (isNaN(choiceValue)) {
    console.log(chalk.bgRed("Incorrect Choice....."));
    prompt("Press Enter To Continue : ");
    menu();
  }
  return choiceValue;
}

try {
  const result = fs.readFileSync(filePath, "utf-8");
  console.log(chalk.bgGreen("File Opened Successfully...."));
  questions = JSON.parse(result);
}

catch (error) {
  console.log(chalk.bgRed("No File Exist...."));
}

finally {
  prompt("Press Enter To Continue : ");
  let choice, temp, opStatus;
  do {
    choice = menu();
    switch (choice) {
      case 1:
        temp = prompt("Enter New Question : ");
        let newQuestion = new question(temp);
        for (let i = 1; i <= 4; i++) {
          let disp = `Enter Option ${i} : `;
          temp = prompt(disp);
          newQuestion.entryoption(temp);
        }
        temp = prompt("Set The Correct Option Between 1 to 4 : ");
        opStatus = validateoption(temp);
        while (!opStatus) {
          console.log(chalk.bgRed("Invalid Option...."));
          temp = prompt("Set The Correct Option Between 1 to 4 : ");
          opStatus = validateoption(temp);
        }
        temp = parseInt(temp);
        newQuestion.setkey(temp);
        questions.push(newQuestion);
        break;
      case 2:
        display();
        break;
      case 3:
        temp = prompt("Enter Question Number To Be Deleted : ");
        opStatus = isnumber(temp);
        if (opStatus) {
          temp = parseInt(temp);
          let opStatus = isqpexist(temp);
          if (opStatus === -1) {
            console.log(chalk.bgRed("Invalid Question Number...."));
          }
          else {
            questions = questions.filter((item, index) => index != opStatus);
            console.log(chalk.bgGreen("Deleted Successfully...."));
          }
        }
        else {
          console.log(chalk.bgRed("Please Enter A Number...."));
        }
        break;
      case 4:
        console.log(chalk.red("Exitting.....\n"));
        break;
      default:
        console.log(chalk.bgRed("Enter Choice Properly"));
    }
    prompt("Press Enter To Continue : ");
  } while (choice !== 4);
  try {
    let finaldata = JSON.stringify(questions);
    fs.writeFileSync(filePath, finaldata);
    console.log(chalk.bgGreen("File Wrtten Successfully...."));
  }
  catch (error) {
    console.log(chalk.bgRed(error.message));
  }
}