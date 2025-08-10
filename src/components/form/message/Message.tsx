'use client '

import React,{JSX} from 'react'

interface Message {
  type: string | undefined;
  text: string | undefined;
}

const Message = React.memo( ({  m }: {m: Message }): JSX.Element => {
  const date = new Date();


    return (
      <div  className={`speech speech-${m.type}`}>
        {m.text}  
        <span className='time'>{date.getHours()}:{date.getMinutes()<10 ? `0${date.getMinutes()}`:`${date.getMinutes()}`}</span>
      </div>
    )
  }
  )
export default Message