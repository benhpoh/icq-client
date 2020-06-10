import React from "react"
import { useState } from "react"
import { Link } from 'react-router-dom'
import './Join.css'


export default function Join() {
  const [username, setUsername] = useState('')
  const [channel, setChannel] = useState('')

  return (
    <div className="join-container main-container">
      <div>
        <h1>Join</h1>

        <div><input type="text" className="join-input" onChange={e => {setUsername(e.target.value)}} placeholder="Username"/></div>
        <div><input type="text" className="join-input" onChange={e => {setChannel(e.target.value)}} placeholder="Channel name"/></div>

        <Link to={`/chat?n=${username}&c=${channel}`}>
          <button className="join-btn" type="submit" disabled={(!username || !channel) ? true : ""}>Join Channel</button>
        </Link>
      </div>

    </div>
  )
}