import React from 'react'
import "./Input.css"

export default function Input(props) {
  return (
    <form className="input-form">
      <input 
        type="text"
        className="input-box"
        value={props.message} 
        onChange={evt => props.onChange(evt.target.value)}
        onKeyPress={evt => evt.key === 'Enter' ? props.onSubmit : null }
      />

      <button type="submit" className="input-send" onClick={evt => props.sendMessage(evt)}>Send</button>
      
    </form>
  )
}