import React from 'react'

export default function Infobar(props) {
  return (
    <div className="infobar">
      <div className="infobar-title">
        <h3>{props.channel.toUpperCase()}</h3>
      </div>
    </div>
  )
}