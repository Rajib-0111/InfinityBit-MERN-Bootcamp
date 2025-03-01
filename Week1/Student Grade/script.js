const chalk = require("chalk");
const fs = require("fs");
const ps = require("prompt-sync");

const filePath = "./data.json";

const prompt = ps({ sigint: true });

let studData = [];

class student {
  constructor(name, rollNo) {
    this.name = name;
    this.rollNo = rollNo;
  }

  enterMarks(m1, m2, m3, m4, m5) {
    this.sub1 = m1;
    this.sub2 = m2;
    this.sub3 = m3;
    this.sub4 = m4;
    this.sub5 = m5;
  }

  calanalysis() {
    this.totalMarks = (this.sub1 + this.sub2 + this.sub3 + this.sub4 + this.sub5);
    this.percentage = this.totalMarks / 5;
    if (this.percentage > 90) {
      this.grade = "O";
    }
    else if (this.percentage > 80) {
      this.grade = "A+";
    }
    else if (this.percentage > 70) {
      this.grade = "A";
    }
    else if (this.percentage > 60) {
      this.grade = "B+";
    }
    else if (this.percentage > 50) {
      this.grade = "B";
    }
    else if (this.percentage > 40) {
      this.grade = "C";
    }
    else if (this.percentage > 30) {
      this.grade = "PASS";
    }
    else {
      this.grade = "FAIL";
    }
  }
}

function isNumber(string) {
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) < 48 || string.charCodeAt(i) > 57) {
      return false;
    }
  }
  return true;
}

function menu() {
  let choiceValue;
  console.clear();
  console.log("-----------------------------------------");
  console.log("\t\t M E N U");
  console.log("-----------------------------------------");
  console.log("1. Display All Student\n2. Details Of A Student\n3. Add New Student\n4. Alter A Record\n5. Delete A Record\n6. Exit");
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

function chkRollNumber(tempRollNo) {
  for (let i = 0; i < studData.length; i++) {
    if (studData[i].rollNo === tempRollNo) {
      return i;
    }
  }
  return -1;
}

function displayExact(tempRollNo) {
  if (studData.length === 0) {
    return -2;
  }
  for (let i = 0; i < studData.length; i++) {
    if (studData[i].rollNo === tempRollNo) {
      return i;
    }
  }
  return -1;
}

function displayAll() {
  if (studData.length === 0) {
    console.log(chalk.bgRed("No Record Found...."));
    return;
  }
  console.log("-----------------------------------------");
  console.log("\t S T U D E N T  L I S T");
  console.log("-----------------------------------------");
  console.log("\n---------------------------");
  console.log("NAME     ||    ROLL NO");
  console.log("---------------------------");
  for (let i = 0; i < studData.length; i++) {
    console.log(studData[i].name, " || ", studData[i].rollNo);
  }
}

try {
  const result = fs.readFileSync(filePath, "utf-8");
  console.log(chalk.bgGreen("File Opened Successfully...."));
  const rawData = JSON.parse(result);

  studData = rawData.map(obj => {
    let temp = new student(obj.name, obj.rollNo);
    temp.enterMarks(obj.sub1, obj.sub2, obj.sub3, obj.sub4, obj.sub5);
    temp.calanalysis();
    return temp;
  })
}

catch (error) {
  console.log(chalk.bgRed("No File Exist...."));
}

finally {
  prompt("Press Enter To Continue : ");
  let choice = 0, temp, opStatus;
  do {
    choice = menu();
    switch (choice) {
      case 1:
        displayAll();
        break;
      case 2:
        temp = prompt("Enter Roll Number : ");
        if (!isNumber(temp)) {
          console.log(chalk.bgRed("Invalid Roll Number"));
        }
        else {
          temp = parseInt(temp);
          opStatus = displayExact(temp);
          if (opStatus === -2) {
            console.log(chalk.bgRed("Empty List...."));
          }
          else if (opStatus === -1) {
            console.log(chalk.bgRed("No Record Found...."));
          }
          else {
            console.log(chalk.bgGreen("Record Found"));
            console.log("Name : ", studData[opStatus].name);
            console.log("Roll No : ", studData[opStatus].rollNo);
            console.log("Subject 1 : ", studData[opStatus].sub1);
            console.log("Subject 2 : ", studData[opStatus].sub2);
            console.log("Subject 3 : ", studData[opStatus].sub3);
            console.log("Subject 4 : ", studData[opStatus].sub4);
            console.log("Subject 5 : ", studData[opStatus].sub5);
            console.log("Percentage : ", studData[opStatus].percentage, "%");
            console.log("Grade : ", studData[opStatus].grade);
          }
        }
        break;
      case 3:
        temp = prompt("Enter Roll Number : ");
        if (!isNumber(temp)) {
          console.log(chalk.bgRed("Invalid Roll Number"));
          break;
        }
        temp = parseInt(temp);
        opStatus = chkRollNumber(temp);
        if (opStatus >= 0) {
          console.log(chalk.bgRed("Roll Number Already Exist...."));
        }
        else {
          let newName = prompt("Enter Name : ");
          let newStud = new student(newName, temp);
          let temparray = [];
          let i;
          for (i = 0; i < 5; i++) {
            temp = parseInt(prompt(`Enter Marks Of Subject${i + 1} : `));
            if (isNaN(temp) || temp < 0 || temp > 100) {
              console.log(chalk.bgRed("Invalid Marks"));
              break;
            }
            temparray[i] = temp;
          }
          if (i >= 5) {
            newStud.enterMarks(temparray[0], temparray[1], temparray[2], temparray[3], temparray[4]);
            newStud.calanalysis();
            studData.push(newStud);
            console.log(chalk.bgGreen("Insertion Successful..."));
          }
        }
        break;
      case 4:
        temp = prompt("Enter Roll Number : ");
        if (!isNumber(temp)) {
          console.log(chalk.bgRed("Invalid Roll Number"));
          break;
        }
        temp = parseInt(temp);
        opStatus = chkRollNumber(temp);
        if (opStatus < 0) {
          console.log(chalk.bgRed("No Data Found...."));
        }
        else {
          console.log(chalk.bgGreen("Current Data...."));
          console.log("Name : ", studData[opStatus].name);
          console.log("Roll No : ", studData[opStatus].rollNo);
          console.log("Subject 1 : ", studData[opStatus].sub1);
          console.log("Subject 2 : ", studData[opStatus].sub2);
          console.log("Subject 3 : ", studData[opStatus].sub3);
          console.log("Subject 4 : ", studData[opStatus].sub4);
          console.log("Subject 5 : ", studData[opStatus].sub5);

          let newName = prompt("Enter New Name : ");
          let temparray = [];
          let i;
          for (i = 0; i < 5; i++) {
            temp = parseInt(prompt(`Enter New Marks Of Subject${i + 1} : `));
            if (isNaN(temp) || temp < 0 || temp > 100) {
              console.log(chalk.bgRed("Invalid Marks"));
              break;
            }
            temparray[i] = temp;
          }
          if (i >= 5) {
            studData[opStatus].name = newName;
            studData[opStatus].enterMarks(temparray[0], temparray[1], temparray[2], temparray[3], temparray[4]);
            studData[opStatus].calanalysis();
            console.log(chalk.bgGreen("Updation Successful..."));
          }
        }
        break;
      case 5:
        temp = prompt("Enter Roll Number : ");
        if (!isNumber(temp)) {
          console.log(chalk.bgRed("Invalid Roll Number"));
          break;
        }
        temp = parseInt(temp);
        opStatus = chkRollNumber(temp);
        if (opStatus < 0) {
          console.log(chalk.bgRed("No Data Found"));
        }
        else{
          studData = studData.filter((x, index) => opStatus != index);
          console.log(chalk.bgGreen("Deletion Successfull"));
        }
        break;
      case 6:
        console.log(chalk.red("Exitting.....\n"));
        break;
      default:
        console.log(chalk.bgRed("Enter Choice Properly"));
    }
    prompt("Press Enter To Continue : ");
  } while (choice != 6);
  try {
    let finaldata = JSON.stringify(studData);
    fs.writeFileSync(filePath, finaldata);
    console.log(chalk.bgGreen("Data File Updated Successfully...."));
  }
  catch (error) {
    console.log(chalk.bgRed(error.message));
  }
}

