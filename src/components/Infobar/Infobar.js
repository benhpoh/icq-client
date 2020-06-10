import React from 'react'

import closeIcon from "../../icons/closeIcon.png"
import onlineIcon from "../../icons/onlineIcon.png"

export default function Infobar(props) {
  return (
    <div className="infobar">
      <div className="infobar-title">
        <img className="onlineIcon" src={onlineIcon} alt="Icon"/>
        <h3>{props.channel}</h3>
      </div>
      <div className="infobar-close">
        <a href="/"><img src={closeIcon} alt="Close"/></a>
      </div>
    </div>
  )
}