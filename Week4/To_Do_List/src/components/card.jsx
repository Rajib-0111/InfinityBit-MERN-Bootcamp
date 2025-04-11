import React from 'react'
import './card.css'
function Card(props) {
  return (
    <>
    <div className='card'>
      <span className='main-task'>{props.task}</span>
    </div>
    <div className='empty'>
    </div>
    </>
  )
}

export default Card