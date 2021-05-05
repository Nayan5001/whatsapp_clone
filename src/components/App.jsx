import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login.jsx";
import Upload from "./Upload.jsx";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import { useHistory,Redirect } from 'react-router'
import { useStateValue } from "./StateProvider";
import ReactDOM from "react-dom";
import UserCard from "./UserCard";
import Welcome_Screen from "./Welcome_Screen.jsx"
function App() {
  function handleSubmit(event) {
    event.preventDefault();
  }

<form onSubmit={handleSubmit}></form>
  
      const [{ user }, dispatch] = useStateValue();
      window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
      };
      return (
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId" component={Chat} />
                <Route path="/upload" component={UserCard} />
                <Route exact path="/" component={Welcome_Screen} />
                {/* <RefreshRoute exact path="/rooms/:roomId" component={"/"} /> */}
                {/* <Redirect exact from="/rooms/:roomId" to="/" /> */}
              </Switch>
              <Link to="/" />
            </Router>
            {/* <Sidebar />
                      <Chat /> */}
          </div>
        )}
      </div>
    );
  }

export default App;
