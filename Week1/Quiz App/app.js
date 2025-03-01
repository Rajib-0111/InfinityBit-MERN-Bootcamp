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

try{
  let result = fs.readFileSync(filePath, "utf-8");
  console.log(chalk.bgGreen("Questions File Found...."));
  questions = JSON.parse(result);
}
catch(error){
  console.log(chalk.bgRed("Questions File Not Found....\n\nExitting...."));
  exit();
}

finally{
  let limit = questions.length;
  let sequence = [];
  for(let i = 0; i < limit; i++){
    while (1) {
      let current = Math.floor(Math.random() * limit);
      if(sequence.indexOf(current) === -1){
        sequence.push(current)
        break;
      } 
    }
  }
  console.log(chalk.bgGreen("Random Question Sequence Generated...."));
  prompt("Press Enter To Continue : ");
  let score = 0;
  while(limit > 0){
    let temp, current;
    console.clear();
    console.log("----------------------------------------------");
    console.log("\t\tCurrent Score : ", score);
    console.log("----------------------------------------------");
    current = sequence.pop();
    console.log(questions[current].name,"\n");
    console.log("Options Are : ");
    for(let i = 0; i < 4; i++){
      console.log(i+1,". ", questions[current].options[i]);
    }
    console.log("");
    while(1){
      temp = prompt("Choose Option : ");
      let status = validateoption(temp);
      if(!status){
        console.log(chalk.bgRed("Choose Between 1 to 4...."));       
      }
      else{
        break;
      }
    }
    if(temp == questions[current].answerKey){
      console.log(chalk.bgGreen("Your Answer Is Correct....\n"));
      score += 1;
    }
    else{
      console.log(chalk.bgRed("Your Answer Is Wrong....\n"));
    }
    prompt("Press Enter To Move To The Next Question : ");
    limit -= 1;
  }
  console.log("Your Final Score Is : ", score);
  console.log("Out Of : ", questions.length);
  let accu = (score/questions.length) * 100;
  console.log("Accuracy : ", accu.toFixed(2), "%");
  console.log("\nSee You Again.......");
}