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
import PrivateRoute from './components/PrivateRoute/PrivateRoute'


export const contextUser=createContext();





function App() { 
  const [user,setUser]=useState(JSON.parse(sessionStorage.getItem('user'))||{email:""});

  //this usestate keeps that wheather you click on add student or add  teacher link in sidebar. and it sets 3 values

  const [addOptions,setAddOptions]=useState({title:"Add student",fieldNam:"Student Id", fetchUrl:"addStudent",insertMany:"addManyStudent"});
  return (
    <contextUser.Provider value={[user,setUser,addOptions,setAddOptions]}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <Admin></Admin> 
            </PrivateRoute>
            <Route path="/login">
                <Login></Login>
              </Route>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            <Route path="/allStudents">
              <Admin></Admin>
            </Route>
            <Route path="/addStudents">
              <Admin></Admin>
            </Route>
            <Route path="/allTeachers">
              <Admin></Admin>
            </Route>
            <Route path="/addTeachers">
              <Admin></Admin>
            </Route>
            <Route path="/addOfferlist">
              <Admin></Admin>
            </Route>
            <Route path="/addCourses">
              <Admin></Admin>
            </Route>
            <Route path="/getCourses">
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
