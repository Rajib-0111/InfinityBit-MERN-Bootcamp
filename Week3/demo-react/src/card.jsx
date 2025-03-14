import React from 'react'
import "./card.css"
function Card(myobj) {
  return (
    <div className='card-container'>
      <div className='card-data'>
        <span className='txt-head'>Name:</span>
        <span className='txt-bdy'>{myobj.myname}</span>
      </div>
      <div className='card-data'>
        <span className='txt-head'>Email Id:</span>
        <span className='txt-bdy'>{myobj.myemail}</span>
      </div>
    </div>
  )
}

export default Card