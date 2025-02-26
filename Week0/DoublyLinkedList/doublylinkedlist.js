const ps = require("prompt-sync");

const prompt = ps({sigint:true});

let head = null;

function createNode(value){
  return(
    {
      "Data" : value,
      "Next" : null,
      "Prev" : null,
    }
  ) 
};

let choice = 0, opStatus, temp;

do{
  choice = menu();
  switch(choice){
    case 1:
      break;
    case 2:
      temp = parseInt(prompt("Enter Data To Insert : "));
      if(isNaN(temp)){
        console.log("Enter Data Properly...");
        break;
      }
      head = insert(head, temp);
      if(head){
        console.log("Insert Successful...");
      }
      else{
        console.log("Insert Failed...");
      }
      break;
    case 3:
      display(head);
      break;
    case 4:
      temp = parseInt(prompt("Enter Data To Delete: "));
      if(isNaN(temp)){
        console.log("Enter Data Properly...");
        break;
      }
      opStatus = deleteNode(head, temp);
      if(opStatus === -1){
        console.log("The List Is Empty...");
      }
      else if(opStatus === 0){
        console.log(`${temp} Is Not Present In The List`);
      }
      else{
        head = opStatus;
        console.log(`${temp} Deleted Successfully`);
      }
      break;
    case 5:
      console.log("Exitting.....");
      return;
    default:
      console.log("Choose Properly From The Option....");
  }
  prompt("Press Enter To Continue : ");
}while(choice != 5);

function menu(){
  let choiceValue;
  console.clear();
  console.log("-----------------------------------------");
  console.log("\t\t M E N U");
  console.log("-----------------------------------------");
  console.log("1. Initialize\n2. Insert\n3. Display\n4. Delete\n5. Exit");
  console.log("-----------------------------------------");
  choiceValue = parseInt(prompt("Enter Your Choice : "));
  if(isNaN(choiceValue)){
    console.log("Incorrect Choice.....");
    prompt("Press Enter To Continue : ");
    menu();
  }
  return choiceValue;
}


function display(head){
  let tempHead = head;
  let result = "";
  if(head === null){
    console.log("The List Is Empty...");
    return;
  }
  while (tempHead !== null) {
    result += `${tempHead.Data} -> `;
    tempHead = tempHead.Next;
  }
  result += "null";
  console.log(result);
  return;
}

function insert(head, newValue){
  let newNode = createNode(newValue);
  if(head === null){
    return newNode;
  }

  let tempHead = head;
  while(tempHead.Next !== null){
    tempHead = tempHead.Next;
  }

  newNode.Prev = tempHead;
  tempHead.Next = newNode;
  return head;
}

function deleteNode(head, delValue){
  if(head === null){
    return -1;
  }
  let tempHead = head;

  while(tempHead !== null){
    if(tempHead.Data === delValue){
      break;
    }
    tempHead = tempHead.Next;
  }
  if(tempHead === null){
    return 0;
  }
  if(tempHead.Prev === null){
    tempHead = tempHead.Next;
    if(tempHead != null){
      tempHead.Prev = null;
    }
    return tempHead;
  }
  tempHead.Prev.Next = tempHead.Next;
  if(tempHead.Next !== null){
    tempHead.Next.Prev = tempHead.Prev;
  }
  return head;
}