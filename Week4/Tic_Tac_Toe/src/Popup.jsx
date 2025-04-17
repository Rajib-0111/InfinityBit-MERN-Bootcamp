import React from 'react'
import "./Popup.css"
const resetScreen = () => {
  window.location.reload();
  console.log("Pressed");
}

function Popup(props) {
  return (  
    <div className='popup'>
      <span className='message'>{props.data}</span>
      <button onClick={resetScreen} className='resetbtn'>Play Again</button>
    </div>
  )
}

export default Popup