import React from 'react'
import queryString from 'query-string'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'
import Chat from './components/Chat/Chat.js'
import Channels from './components/Channels/Channels.js'
import icqLogo from './images/icq.png'

function App() {
  let endpoint = "http://icq-server.herokuapp.com/"
  const { n: name } = queryString.parse(window.location.search)
  const [username, setUsername] = React.useState(name ||"iSeekYou" + Math.ceil(Math.random()*100))
  return (
    <Router>

      <div className="app-layout">
        <div className="icq-main">
          <header>
            <img src={icqLogo} alt="logo"/>
            <h3 className="icq-title">ICQ</h3>
          </header>

          <div className="icq-username-panel">
            <label className="icq-label">Nickname</label>
            <input type="text" value={username} onChange={evt => {setUsername(evt.target.value)}} placeholder="anonymousPossum"/>
          </div>

          <Channels username={username} endpoint={endpoint}/>

        </div>


        <Route path="/chat/:channel">
          <Chat endpoint={endpoint} channel=""/>
        </Route>

      </div>

    </Router>
  );
}

export default App;
