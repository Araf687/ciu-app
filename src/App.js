import { makeStyles } from '@material-ui/core';
import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin/Admin';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
export const contextUser=createContext();





function App() {
  return (
    <contextUser.Provider>
        <Router>
          <Switch>
            <Route exact path="/login">
                <Login></Login>
              </Route>
            <Route exact path="/admin">
              <Admin></Admin>
            </Route>
            <Route exact path="/">
              <Admin></Admin>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
        
    </ contextUser.Provider>
  );
}

export default App;
