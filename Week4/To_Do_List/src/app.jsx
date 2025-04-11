import React, { useState } from "react";
import './app.css'
import Card from "./components/card";
function App() {
  let [btntxt, txtSet] = useState("Add Task");
  let [currentClicked, clickSet] = useState(-1);
  let [isedit, setEdit] = useState(false);
  let [alltask, addTasks] = useState([]);
  let [input, getInput] = useState('');
  const taskHandler = (event) => {
    getInput(event.target.value);
  }
  const addNewTask = () => {
    if(!isedit){
      alltask.push(input);
      addTasks(alltask);
    }
    else{
      alltask[currentClicked] = input;
      addTasks(alltask);
    }
    getInput("");
    setEdit(false);
    clickSet(-1);
    txtSet("Add Task");
  }

  const editHandler = (index) => {
    getInput(alltask[index]);
    setEdit(true);
    clickSet(index);
    txtSet("Edit Task");
  }


  const delHandler = (index) => {
    const resultArray = alltask.filter((word) => alltask.indexOf(word) != index);
    addTasks(resultArray);
  }

  return (
    <>
      <div className="main">
        <div className="upper">
          <span className="main-txt">Enter Task</span>
          <input type="text" name="task-input" className="input-bx" value={input} onChange={taskHandler}/>
          <div className="empty"></div>
          <button className="my-btn" onClick={addNewTask}>{btntxt}</button>
        </div>
        <div className="lower">
            {
              alltask.map((item, index) => (
                <div key={index} className="card-container">
                  <Card task={item}/>
                    <div className='btn-area'>
                      <button className='card-btn' onClick={() => delHandler(index)}>✅</button>
                      <button className='card-btn' onClick={() => editHandler(index)}>✏️</button>
                    </div>
                </div>
              )
              )
            }
        </div>
      </div>
    </>
  );
}

export default App;
