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
import AddStudent from '../../StudentSection/AddStudent';
import AllStudent from '../../StudentSection/AllStudent';
import AllTeachers from '../../TeacherSection/AllTeachers';
import AddOfferList from '../../OfferList/AddOfferList';
import AddCourse from '../../CourseSection/AddCourse';
import AllCourses from '../../CourseSection/AllCourses';
import AddUser from '../../User/AddUser';
import AllUsers from '../../User/AllUsers';
import Result from '../../Result/Result';
import OfferlistBoard from '../../OfferList/OfferlistBoard';
import Extra from '../../Extra';
import StudentProfile from '../../StudentSection/StudentProfile';
import SearchStudent from '../../StudentSection/SearchStudent';
import RoutineBoard from '../../Routine/Routine/RoutineBoard';
import ManageRoutineExternal from '../../Routine/ManageRoutineExternal/ManageRoutineExternal';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


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
                            <AllStudent></AllStudent>
                            {/* <Practise></Practise> */}
                        </Route>
                        <Route path="/addStudents">
                            <AddStudent></AddStudent>
                        </Route>
                        <Route path="/allTeachers">
                            <AllTeachers></AllTeachers>
                        </Route>
                        <Route path="/addTeachers">
                            <AddStudent></AddStudent>
                        </Route>
                        <Route path="/addAdbisingList">
                            <AddOfferList></AddOfferList>
                        </Route>
                        <Route path="/getOfferlist">
                            <OfferlistBoard></OfferlistBoard>
                        </Route>
                        <Route path="/addCourses">
                            <AddCourse></AddCourse>
                        </Route>
                        <Route path="/allCourses">
                            <AllCourses></AllCourses>
                        </Route>
                        <Route path="/addUser">
                            <AddUser></AddUser>
                        </Route>
                        <Route path="/allUsers">
                            <AllUsers></AllUsers>
                        </Route>
                        <Route path="/routine">
                            <RoutineBoard></RoutineBoard>
                        </Route>
                        <Route path="/manageRoutineExternals">
                            <ManageRoutineExternal></ManageRoutineExternal>
                        </Route>
                        <Route path="/result">
                            {/* <Result></Result> */}
                            {/* <OfferlistBoard></OfferlistBoard> */}
                            <DndProvider backend={HTML5Backend}>
                               <Extra></Extra>
                            </DndProvider>
                            
                            {/* <SearchStudent></SearchStudent> */}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </contextAdmin.Provider>
    );
};

export default Admin;