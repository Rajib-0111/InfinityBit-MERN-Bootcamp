import React, {useState} from 'react'
import './App.css'
import Card from './card'

function App() {
  class user{
    constructor(name, email){
      this.username = name;
      this.useremail = email;
    };
  };
  
  const [userList, updateUserList] = useState([]);
  const [userName, updateName] = useState("");
  const [userEmailId, updateEmail] = useState("");

  const userHandler = () => {
    let newUser = new user(userName, userEmailId);
    userList.push(newUser);
    updateUserList(userList);
    console.log(userList);
    updateName("");
    updateEmail("");
  }

  const namehandler = (event) => {
    updateName(event.target.value);
  }

  const emailhandler = (event) => {
    updateEmail(event.target.value);
  }

  return (
    <div className='container'>
      <div className='input-area'>
      <div className='test'>
      <div className='input-sec'>
      <label htmlFor="username" className='label-txt'>Enter Username</label>
      <input type="text" id='username'className='input-bx' value={userName} onChange={namehandler}/>
      </div>
      <div className='input-sec'>
      <label htmlFor="usermail" className='label-txt'>Enter Email</label>
      <input type="text" id='emailid' className='input-bx' value={userEmailId} onChange={emailhandler}/>
      </div>
      </div>
      <div className='empty'></div>
      <button className='btn' onClick={userHandler}>Submit</button>
      </div>
      <div className='empty'></div>
      <div className='card-area'>
        {
          userList.map((item, index) => {
            return <Card key={index} myname={item.username} myemail={item.useremail}/>
          }
        )
        }
      </div>
    </div>
  )
}

export default App