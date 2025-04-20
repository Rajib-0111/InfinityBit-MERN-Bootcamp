import React, { useState } from 'react'
import "./Display.css"

function Display(props) {
  const [align, setAlign] = useState(true);
  const message = props.data;
  return (
    <>
    <div className="empty"></div>
    <div className="msgcontainer">
      <ul>
        {
          message.map((item, index) => (
            <li key={index}>
              <div className={index % 2 == 0 ? "mssgboxright" : "mssgboxleft"}>
                <span className={index % 2 == 0 ? "msgtxtright" : "msgtxtleft"} id='mssg'>{item.message}</span>
                <span className={index % 2 == 0 ? "msgtxtright" : "msgtxtleft"} id={item.mood === "angry" ? "angrymood" : item.mood === "sad" ? "sadmood" : "happymood"}>{`Mood : ${item.mood}`}</span>
                <span className={index % 2 == 0 ? "msgtxtright" : "msgtxtleft"} id='username'>{`---${item.user}`}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
    </>
  )
}

export default Display