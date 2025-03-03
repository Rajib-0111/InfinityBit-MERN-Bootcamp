const PromptSync = require("prompt-sync");

const prompt = PromptSync({ sigint: true });

function dec2bin(decimal) {
  let result = "";
  while (decimal != 0) {
    let current = decimal % 2;
    if (current === 0) {
      result = "0" + result;
    } else {
      result = "1" + result;
    }
    decimal = Math.floor(decimal / 2);
  }
  result = "0" + result;
  if (sign === -1) {
    for (let i = 0; i < result.length; i++) {
      if (result.charCodeAt(i) === 48) {
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "1" + last;
      } else {
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "0" + last;
      }
    }
    let carry = 0;
    let value = 1;
    for (let i = result.length - 1; i >= 0 ; i--){
      if(result.charCodeAt(i) === 48 && carry == 0 && value == 0){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "0" + last;
        carry = 0;
      }
      else if(result.charCodeAt(i) === 48 && carry == 0 && value == 1){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "1" + last;
        carry = 0;
      }
      else if(result.charCodeAt(i) === 48 && carry == 1 && value == 0){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "1" + last;
        carry = 0;
      }
      else if(result.charCodeAt(i) === 48 && carry == 1 && value == 1){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "0" + last;
        carry = 1;
      }
      else if(result.charCodeAt(i) === 49 && carry == 0 && value == 0){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "1" + last;
        carry = 0;
      }
      else if(result.charCodeAt(i) === 49 && carry == 0 && value == 1){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "0" + last;
        carry = 1;
      }
      else if(result.charCodeAt(i) === 49 && carry == 1 && value == 0){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "0" + last;
        carry = 1;
      }
      else if(result.charCodeAt(i) === 49 && carry == 1 && value == 1){
        let first = result.slice(0, i);
        let last = result.slice(i+1);
        result = first + "1" + last;
        carry = 1;
      }
      value = 0;
    }
    if(carry === 1){
      result = "1" + result;
    }
  }
  return result;
}

function bin2dec(binary) {
  let result = 0;
  let power = 0;
  while (binary > 0) {
    let digit = binary % 10;
    binary = Math.floor(binary / 10);
    result += digit * Math.pow(2, power);
    power += 1;
  }
  result *= sign;
  return result;
}

function extractinput() {
  let start = 2,
    res = 0;
  if (status === 1) {
    start = 1;
  }
  if (base === 10) {
    while (start < input.length) {
      if (input.charCodeAt(start) >= 48 && input.charCodeAt(start) <= 57) {
        res *= 10;
        res += input.charCodeAt(start) - 48;
      } else {
        return false;
      }
      start += 1;
    }
  } else {
    while (start < input.length) {
      if (input.charCodeAt(start) >= 48 && input.charCodeAt(start) <= 49) {
        res *= 10;
        res += input.charCodeAt(start) - 48;
      } else {
        return false;
      }
      start += 1;
    }
  }
  return res;
}
function findsign() {
  if (input.charCodeAt(1) >= 48 && input.charCodeAt(1) <= 57) {
    return 1;
  } else if (input[1] === "+") {
    sign = 1;
    return 0;
  } else if (input[1] === "-") {
    sign = -1;
    return 0;
  } else {
    return -1;
  }
}

function findbase() {
  if (input[0] === "d" || input[0] === "D") {
    base = 10;
  } else if (input[0] === "b" || input[0] === "B") {
    base = 2;
  } else {
    return -1;
  }
}

let sign, result, base, status, decimal, num;

let input = [];

sign = 1;

input = prompt("Enter A Number (d sign input / b sign input) ==> ");

input = input.replaceAll(" ", "");

status = findbase();

if (status === -1) {
  console.log("Incorrect Input Format....");
  process.exit(-1);
}

status = findsign();

if (status === -1) {
  console.log("Incorrect Input Format....");
  process.exit(-1);
}

num = extractinput();

if (!num) {
  console.log("Incorrect Number....");
  process.exit(-1);
}

if (base === 10) {
  result = dec2bin(num);
  if (sign === 1) {
    console.log(`Binary Equivalent Of +${num} Is ${result}`);
  } else {
    console.log(`Binary Equivalent Of -${num} Is ${result}`);
  }
} else {
  result = bin2dec(num);
  if (sign === 1) {
    console.log(`Decimal Equivalent Of +${num} Is ${result}`);
  } else {
    console.log(`Decimal Equivalent Of -${num} Is ${result}`);
  }
}
