import React from "react"
import { useState, useEffect } from "react"
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Infobar from '../Infobar/Infobar.js'
import Messages from '../Messages/Messages.js'
import Input from '../Input/Input.js'

var socket

export default class Chat extends React.Component {
  state = {
    name: "",
    channel: "",
    usersInChannel: [],
    message: "",
    messages: [],
  }

  componentDidMount() {
    const {n: name, c: channel} = queryString.parse(window.location.search)

    
    const endpoint = this.props.endpoint
    socket = io(endpoint)

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
    })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
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
  render() {
    const {message, messages, name, channel} = this.state

    return (
      <div className="chat-container main-container">
        <div>
          <Infobar channel={channel} />
          <Messages messages={messages} name={name}/>
          <Input
            message={message} 
            onChange={this.onChange}
            onSubmit={() =>this.setState({messages: [...messages, message]})}
            sendMessage={this.sendMessage}
          />
          
        </div>
      </div>
    )
  }
}