import React from 'react'

export default function Message({name, message}) {
  let messageByCurrentUser = false
  const trimmedName = name.trim().toLowerCase()
  if (message.user === trimmedName) {
    messageByCurrentUser = true
  }

  return (
    messageByCurrentUser
    ? (
      <div className="message-wrapper message-wrapper-sent">
        <p className="message-text">You: {message.text}</p>
      </div>
    )
    : (
      <div className="message-wrapper message-wrapper-received">
        <p className="message-text">{message.user}: {message.text}</p>
      </div>
    )
  )
}