import axios from 'axios';
import React, { useState } from 'react'
import './AddM.css'

function AddM() {
  const [mssgUser, setMssgUser] = useState("");
  const [mssgMood, setMssgMood] = useState("");
  const [mssgBody, setMssgBody] = useState("");

  const inputUserHandler = (event) => {
    let inputVal = event.target.value;
    setMssgUser(inputVal);
  }

  const inputMssgHandle = (event) => {
    let inputVal = event.target.value;
    setMssgBody(inputVal);
  }

  const inputMoodHandle = (event) => {
    let inputVal = event.target.value;
    setMssgMood(inputVal);
  }

  const sendData = () =>{
    if(mssgBody === "" || mssgMood === "" || mssgUser === ""){
      alert("Enter All The Fields");
      return;
    }
    let data = {
      "user" : `${mssgUser}`,
      "message" : `${mssgBody}`,
      "mood" : `${mssgMood.toLowerCase()}`
    }
    console.log(data);
    (async () => {
      try{
        const res = await axios.post("/api/messages", data);
        console.log(res);
        setMssgBody("");
        setMssgMood("");
        alert("Message Sent Successfully...");
      }
      catch (err){
        console.log(err);
      }
    })()
  }
  return (
    <>
    <div className='empty'></div>
    <div className='addarea'>
    <span className='maintxt'>Enter New Message</span>
    <div className='mainarea'>
    <div className='msgtxtarea'>
    <label htmlFor='msguser' className='heading spcl'>User Name</label>
    <input type="text" value={mssgUser} onChange={() => inputUserHandler(event)} placeholder='Enter User Name' id="msguser"/>
    <label htmlFor='msgtxt' className='heading'>Message Text</label>
    <input type="text" value={mssgBody} onChange={() => inputMssgHandle(event)} placeholder='Enter Message' id='msgtxt'/>
    </div>
    <div className='remarea'>
      <div className='inparea'>
      <label htmlFor="mood" className='heading spl'>Select Your Mood</label>
    <select name="mood" id="mood" value={mssgMood} onChange={() => inputMoodHandle(event)}>
      <option value="" disabled>--Select An Option</option>
      <option value="Happy">Happy 😃</option>
      <option value="Sad">Sad 🥲</option>
      <option value="Angry">Angry 😡</option>
    </select>
    </div>
    <input type="submit" onClick={sendData} className='sbbtn'/>
    </div>
    </div>
    </div>
    </>
  )
}

export default AddM