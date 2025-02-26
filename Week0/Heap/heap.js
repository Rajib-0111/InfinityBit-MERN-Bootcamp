let heap = [];

function insert(heap, newElement) {
  if (heap.length === Number.MAX_SAFE_INTEGER) {
    return 0;
  }
  heap.push(newElement);
  insertHeapify(heap);
  return 1;
}

function insertHeapify(heap) {
  let child = heap.length - 1;

  while (child > 0) {
    let parent = Math.floor((child - 1) / 2);
    if (heap[parent] >= heap[child]) {
      break;
    }
    let temp = heap[parent];
    heap[parent] = heap[child];
    heap[child] = temp;
    child = parent;
  }
}

function deleteFromHeap(heap) {
  if (heap.length === 0) {
    return null;
  }
  let last = heap.pop();
  if (heap.length === 0) {
    return last;
  }
  let res = heap[0];
  heap[0] = last;
  deleteHeapify(heap);
  return res;
}

function deleteHeapify(array) {
  let par, lcIndex, rcIndex, lim;

  lim = array.length;
  par = 0;
  while (1) {
    lcIndex = 2 * par + 1;
    rcIndex = 2 * par + 2;

    if (lcIndex >= lim) {
      break;
    }
    else {
      if (rcIndex >= lim) {
        if (array[par] < array[lcIndex]) {
          let temp = array[par];
          array[par] = array[lcIndex];
          array[lcIndex] = temp;

          par = lcIndex;
        }
        else {
          break;
        }
      }
      else {
        if (array[lcIndex] >= array[rcIndex]) {
          if (array[par] < array[lcIndex]) {
            let temp = array[par];
            array[par] = array[lcIndex];
            array[lcIndex] = temp;

            par = lcIndex;
          }
          else {
            break;
          }
        }
        else {
          if (array[par] < array[rcIndex]) {
            let temp = array[par];
            array[par] = array[rcIndex];
            array[rcIndex] = temp;

            par = rcIndex;
          }
          else {
            break;
          }
        }
      }
    }
  }
}

function display(heap) {
  if (heap.length === 0) {
    resultbox.innerHTML = "The Heap Is Empty...";
    return;
  }
  let res = `Displaying Heap : ${heap.join(",")}`;
  resultbox.innerHTML = res;
}

function initialize(heap, value) {
  for (let i = 0; i < value.length; i++) {
    insert(heap, value[i]);
  }
}

let displayButton = document.getElementById("dispButton");
let deleteButton = document.getElementById("deleteButton");
let insertButton = document.getElementById("insertButton");
let resultbox = document.getElementById("result");
let initializeButton = document.getElementById("initializeButton");

displayButton.addEventListener("click", function () {
  display(heap);
});

insertButton.addEventListener("click", function () {
  let newVal = parseInt(prompt("Enter A Value : "));
  if (isNaN(newVal)) {
    resultbox.innerHTML = "Please Enter Proper Input";
    return;
  }
  let result = insert(heap, newVal);
  if (result) {
    resultbox.innerHTML = "Insert Successful";
  }
  else {
    resultbox.innerHTML = "The Heap Is Overflowing";
  }
});

deleteButton.addEventListener("click", function () {
  let result = deleteFromHeap(heap);
  if (result !== null) {
    resultbox.innerHTML = `Deleted Value : ${result}`;
  }
  else {
    resultbox.innerHTML = "The Heap Is Underflowing...";
  }
});

initializeButton.addEventListener("click", function () {
  let tempArray = [];
  let count = parseInt(prompt("Enter How Many Value To Be Initialized : "));
  if (isNaN(count)) {
    resultbox.innerHTML = "Initialization Failed";
    return;
  }
  for (let i = 0; i < count; i++) {
    let newVal = parseInt(prompt("Enter Value : "));
    if (isNaN(newVal)) {
      resultbox.innerHTML = "Initialization Failed";
      return;
    }
    tempArray.push(newVal);
  }
  heap = [];
  initialize(heap, tempArray);
  resultbox.innerHTML = "Initialization Successful";
});
