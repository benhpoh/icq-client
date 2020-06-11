import React from 'react'
import io from 'socket.io-client'
import './Channels.css'
import {Link} from 'react-router-dom'

var socket

export default class Channels extends React.Component {
  state = {
    activeChannels: [],
    newChannel: ""
  }

  componentDidMount() {
    const endpoint = this.props.endpoint
    socket = io(endpoint)
    console.log("retrieve channel from client");
    socket.emit("retrieveChannels")

    socket.on("channelList", ({activeChannels}) => {
      this.setState({activeChannels: activeChannels})
    } )
  }


  render() {
    const username = this.props.username || "anonymousPossum"
    const newChannel = this.state.newChannel || "lobby"

    return (
      <div className="channel-container">

        <div className="channel-new">

          <input 
            value={this.state.newChannel}
            type="text" 
            className="channel-new-input"
            onChange={ evt => this.setState({newChannel: evt.target.value.toLowerCase()})} 
            placeholder="Channel name"
          />

          <Link to={`/chat/${newChannel}?n=${username}`} className="channel-new-button">Start a new channel</Link>

        </div>

        <div className="channel-active-channels-panel">
          <h3>Active Channels:</h3>

          {this.state.activeChannels.length === 0 
          ? (
            <div><p>None available... How about you start one?</p></div>
          )
          : null }
          {this.state.activeChannels.map((channel, index) => {
            return (
              <div key={index}>
                <p className="channel-links">+ <Link to={`/chat/${channel}?n=${username}`}>{channel}</Link></p>
              </div>
            )
          })}
        </div>

      </div>
    )
  }
}