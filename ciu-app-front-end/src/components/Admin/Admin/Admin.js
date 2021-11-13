import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Header from '../../Header/Header';
import Dashboard from '../DashBoard/Dashboard';
import AddStudent from '../StudentSection/AddStudent';
import AllStudent from '../StudentSection/AllStudent';
import Practise from '../../Practise';
import AddTeachers from '../TeacherSection/AddTeachers';
import AllTeachers from '../TeacherSection/AllTeachers';


export const contextAdmin=createContext();

const Admin = () => {
    const [sideMenuWidth,setSideMenuWidth]=useState(70); 
    const useStyle=makeStyles(theme=>({
        marginDescription:{
          background: "#f5f5f5",
          border: "5px solid #fff",
          borderRadius: "10px",
          boxShadow: "0 0 16px rgb(41 42 51 / 7%), 0 6px 20px rgb(41 42 51 / 3%)",
          transition:theme.transitions.create(['margin'],{
            duration:'1s',
          }),
          [theme.breakpoints.up('md')]:{
            margin:`47px 20px 20px ${sideMenuWidth+10}px`,
            padding:'10px 20px',
    
          }, 
       }, 
    
      }))
      const classes=useStyle();
    return (
        <contextAdmin.Provider value={[sideMenuWidth,setSideMenuWidth]}>
            <Router>
                <Header></Header>
                <div className={classes.marginDescription}>
                    <Switch>
                        <Route exact path="/">
                            <Dashboard></Dashboard>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard></Dashboard>
                        </Route>
                        <Route path="/allStudents">
                            {/* <AllStudent></AllStudent> */}
                            <Practise></Practise>
                        </Route>
                        <Route path="/addStudents">
                            <AddStudent></AddStudent>
                        </Route>
                        <Route path="/allTeachers">
                            <AllTeachers></AllTeachers>
                        </Route>
                        <Route path="/addTeachers">
                            <AddTeachers></AddTeachers>
                        </Route>
                        
                    </Switch>
                </div>
            </Router>
        </contextAdmin.Provider>
    );
};

export default Admin;