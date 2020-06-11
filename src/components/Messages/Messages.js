import React from "react"
import './Messages.css'

export default function Messages({ messages, name }) {
  return (
    <div>
     {messages.map((message, idx) => {
       return (
         <div key={idx}>
           <Message name={name} message={message}/>
         </div>
       )
      })}
   </div>
 )
}
 
function Message({name, message}) {
  let messageByCurrentUser = false
  const trimmedName = name.trim().toLowerCase()
  if (message.user === trimmedName) {
    messageByCurrentUser = true
  }

  return (
    messageByCurrentUser
    ? (
      <div>
        <h5 className="message-header">You ({message.user}):</h5>
        <div className="message-wrapper message-wrapper-sent">
          <p className="message-text">{message.text}</p>
        </div>
      </div>
    )
    : (
      <div>
        <h5 className="message-header">{message.user}: </h5>
        <div className="message-wrapper message-wrapper-received">
          <p className="message-text">{message.text}</p>
        </div>
      </div>
    )
  )
}