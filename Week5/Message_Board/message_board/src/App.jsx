import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayM from './components/Display'
import EnterM from './components/AddM'
import './App.css'

function App() {
  
  const [messages, setMessages] = useState(null);
  const [window, setMessageWindow] = useState("input");

  useEffect(() => {
    const interval = setInterval(async () => {
      await reload();
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  const messageHandler = async () => {
    await reload();
    setMessageWindow("output");
  }

  const reload = async () => {
    try{
      const response = await axios.get("/api/messages");
      console.log(response.data);
      setMessages(response.data);
    }
    catch (err){
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <div className="btnarea">
      <button onClick={() => setMessageWindow("input")} className={window == "input"? 'button activebutton' : "button"}>Enter Message</button>  
      <button onClick={messageHandler} className={window == "output"? 'button activebutton' : "button"}>Show Messages</button>
      </div>
      {
        (window === "input") ? <EnterM/> : <DisplayM data={messages}/>
      }  
    </div>
  )
}

export default App