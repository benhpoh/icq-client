import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "../Message/Message.js"

export default function Messages({ messages, name }) {
 return (
   <ScrollToBottom>
     {messages.map((message, idx) => {
       return (
         <div key={idx}>
           <Message name={name} message={message}/>
         </div>
       )
     })}
   </ScrollToBottom>
 )
}