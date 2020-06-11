import React from "react"
import Message from "../Message/Message.js"

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