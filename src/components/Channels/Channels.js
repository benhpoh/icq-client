import React from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'

var socket

export default class Channels extends React.Component {
  state = {
    activeChannels: []
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

  componentDidUpdate() {

  }
  render() {
      return (
        <div>
          {this.state.activeChannels.map(channel => {
            return (
              <div>
                <Link to={`/chat?c=${channel}`}>{channel}</Link>
              </div>
            )
          })}
          <form action="">
            <input type="text" placeholder="Channel name"/>
          <button>Create new channel</button>
          </form>
        </div>
    )
  }
}