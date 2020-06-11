import React from "react"
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Messages from '../Messages/Messages.js'
import Input from '../Input/Input.js'
import { withRouter } from "react-router-dom"

import icqMessage from '../../audio/icq-message.wav'
import icqLogo from '../../images/icq.png'

var socket

class Chat extends React.Component {
  state = {
    name: "",
    channel: "",
    usersInChannel: [],
    message: "",
    messages: [],
  }
  
  componentDidMount() {
    const { n: name } = queryString.parse(window.location.search)
    const channel = this.props.location.pathname.split("/")[2]

    const endpoint = this.props.endpoint
    socket = io(endpoint)
    var msgReceived = new Audio(icqMessage);


    this.setState({name: name, channel: channel})

    socket.emit("join", {name, channel}, (error) => {
      if (error) {
        alert(error)
      }
    })

    socket.on("channelData", ({usersInChannel}) => {
      this.setState({usersInChannel: usersInChannel})
    })

    socket.on('message', message => {
      const previousMessages = this.state.messages
      this.setState({messages: [...previousMessages, message]})
      if (message.user !== "Bot" && message.user !== name) {
        msgReceived.play()
      }
    })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  sendMessage = (evt) => {
    evt.preventDefault()
    const { message } = this.state

    if (message) {
      socket.emit('sendMessage', message, () => this.setState({message: ""}))
    }
  }

  onChange = (message) => {
    this.setState({message: message})
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  
  render() {
    const {message, messages, name, channel} = this.state
    
    return (
      <div>
        <div className="chat-container">
          <header>
            <img src={icqLogo} alt="logo"/>
            <h3 className="chat-container-title">{channel.toUpperCase()}</h3>
          </header>

          <main>
            <Messages messages={messages} name={name}/>
            <div ref={(el) => { this.messagesEnd = el }} />
          </main>

          <footer>
            <Input
              message={message} 
              onChange={this.onChange}
              onSubmit={() =>this.setState({messages: [...messages, message]})}
              sendMessage={this.sendMessage}
            />

          </footer>

        </div>
      </div>
    )
  }
}

export default withRouter(Chat)