import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'
import Join from './components/Join/Join.js'
import Chat from './components/Chat/Chat.js'
import Channels from './components/Channels/Channels.js'

function App() {
  let endpoint = "localhost:4000"
  return (
    <Router>
      <Channels endpoint={endpoint}/>

      <Route path="/" exact>
        <Join />
      </Route>

      <Route path="/chat">
        <Chat endpoint={endpoint}/>
      </Route>

    </Router>
  );
}

export default App;
