import {Collapse, Divider, Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import userImg from '../../../src/image/opu.jpg';
import {
    Link
  } from "react-router-dom";
import './Sidebar.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { contextAdmin } from '../Admin/Admin/Admin';
import { contextUser } from '../../App';
const drawerWidth=220;
const drawerIconWidth=70;

const useStyles=makeStyles(theme=>({
    root:{
        '& a':{
            textDecoration:'none',
            color:'#040136'
        }
    },
    drawer:{
        // backgroundColor:'#f5f5fa',
        backgroundColor:'white',
        overflowX:'hidden',
        border:'none',
        [theme.breakpoints.down('md')]:{
            display:'none',
        }

    },
  
    drawerOpen:{
        width:drawerWidth,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),

    },
    drawerClose:{
        width:drawerIconWidth,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),
    },
    displayNone:{
        display:'none'
    },
    userDetails:{
        textAlign:'center',
        margin:'20px 0px',
        ['& img']:{
            height:'100px',
            width:'100px',
            
            borderRadius:'5px',
            transition:theme.transitions.create(['width','height'],{
                duration:'1s',
            }),
        },
        
    },
    
    userDetailsThumbnail:{
        textAlign:'center',
        ['& img']:{
            border:'5px solid white',
            height:'58px',
            width:'58px',
            borderRadius:'15px',
            transition:theme.transitions.create(['width','height'],{
                duration:'1s',
            }),
        },
        ['& strong']:{
            display:'none',
        },
        transition:theme.transitions.create(['width','height'],{
            duration:'1s',
        }),
    },
    drawerIcons:{
        margin:'0px 20px'
    },
    sideMenuItems:{
        '&:hover':{
            backgroundColor:'#e0e0ea'
        }
    },
    collapseList:{
        paddingLeft:'20px'
    },
    listIcon:{
        marginRight:'10px'

    },
    scrollBar: {
        '&::-webkit-scrollbar': {
          width: '0.4em',
          height:"50px",
          
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1976d2',
          outline: '1px solid slategrey',
          '&:hover':{
              backgroundColor:'#164e8b',
          }
        },

      },
      listItem:{
          fontSize:'15px',
          fontWeight:700,

      }

}))

const Sidebar = (props) => {
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const handleShift=props.shift;
    const [,setSideMenuWidth]=useContext(contextAdmin);
    const userId='RabiulHossain@ciu.edu.bd'
    const [openStudentList, setStudentOpenList] = useState(false);
    const [openTeachers,setOpenTeachers]=useState(false);
    const [openOfferList,setOpenOfferList]=useState(false);
    const [openCourse,setOpenCourse]=useState(false);
    const [openRoutine,setOpenRoutine]=useState(false);
    const [openUser,setOpenUser]=useState(false);

    const [user,,,setAddOptions]=useContext(contextUser);
   
    console.log(user)

    const handleClick = (stateFunction,state) => {
        stateFunction(!state);
    };
    const clickHandle =()=>
    {
        setOpen(!open);
        handleShift(!open);
        open?setSideMenuWidth(drawerIconWidth):setSideMenuWidth(drawerWidth);
    }

    return (
        <div className={classes.root}>
            <Drawer  
            variant='permanent'
            className={clsx(classes.drawer,{[classes.drawerOpen]:open,[classes.drawerClose]:!open})}
            classes={{ paper: clsx(classes.drawer,classes.scrollBar,{
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                }),
            }}
            >

                <List >
                    <ListItem  >
                        
                            <MenuIcon
                                onClick={clickHandle}
                                className={classes.drawerIcons}     
                            >
                            </MenuIcon>
                    </ListItem>
                    <Divider></Divider>
                    
                    <div className={clsx({[classes.userDetails]:open,[classes.userDetailsThumbnail]:!open})}>
                        <img src={userImg} alt=""/>
                        <br></br>
                        <strong>{user.name}</strong>
                    </div>
                    <Divider></Divider>
                </List>
                <List>
                    {/* -------------------------Dashboard section start---------------------- */}
                    <Link to=""><ListItem className={classes.sideMenuItems}>
                        <HomeOutlinedIcon className={classes.drawerIcons}></HomeOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"Dashboard"}></ListItemText>
                    </ListItem></Link>
                    {/* -----------------------------Dashboard section ends------------------------- */}
                    


                    <ListItem button onClick={()=>{handleClick(setStudentOpenList,openStudentList);}} className={classes.sideMenuItems}>
                        <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"students"}></ListItemText>
                        <span className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openStudentList ? <RemoveIcon /> : <AddIcon />}</span>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openStudentList} timeout="auto" unmountOnExit>
                        <Link to="/allStudents">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="All Students" />
                            </ListItem>
                        </Link>
                       {user.role==='Manager' && <Link to="/addStudents">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="Add Students" onClick={()=>{setAddOptions({title:"Add student",fieldName:"Student Id", fetchUrl:"addStudent",insertMany:"addManyStudent"})}}/>
                            </ListItem>
                        </Link>}
                        
                    </Collapse>
                {/* ------------------//--------------- */}
                    <ListItem button className={classes.sideMenuItems} onClick={()=>{handleClick(setOpenTeachers,openTeachers);}}>
                        <PeopleOutlineIcon className={classes.drawerIcons} />
                        <ListItemText  className={clsx({[classes.displayNone]:!open})} primary={"teachers"}></ListItemText>
                        <strong className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openTeachers ? <RemoveIcon /> : <AddIcon />}</strong>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openTeachers} timeout="auto" unmountOnExit>
                        <Link to="/allTeachers">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="All Teachers" />
                            </ListItem>
                        </Link>
                        {user.role==='Manager' && <Link to="/addTeachers" onClick={()=>{setAddOptions({title:"Add Teacher",fieldName:"Teacher Id", fetchUrl:"addTeacher",insertMany:"addManyTeacher"})}}>
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="Add Teachers" />
                            </ListItem>
                        </Link>}
                        
                    </Collapse>
                    {/* ------------------------------user section start------------------- */}
                    {user.role==='Admin'&&<><ListItem button className={classes.sideMenuItems} onClick={()=>{handleClick(setOpenUser,openUser);}}>
                        <PeopleOutlineIcon className={classes.drawerIcons} />
                        <ListItemText  className={clsx({[classes.displayNone]:!open})} primary={"User"}></ListItemText>
                        <strong className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openUser ? <RemoveIcon /> : <AddIcon />}</strong>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openUser} timeout="auto" unmountOnExit>
                        <Link to="/addUser">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="Add User" />
                            </ListItem>
                        </Link>
                        <Link to="/allUsers">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="All Users" />
                            </ListItem>
                        </Link>
                        
                    </Collapse></>}
                    {/* ---------------------------------------user section end----------------------- */}

                    {/*---------------------------course section start---------------*/}
                    <ListItem button className={classes.sideMenuItems} onClick={()=>{handleClick(setOpenCourse,openCourse);}}>
                        <PeopleOutlineIcon className={classes.drawerIcons} />
                        <ListItemText  className={clsx({[classes.displayNone]:!open})} primary={"Courses"}></ListItemText>
                        <strong className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openCourse ? <RemoveIcon /> : <AddIcon />}</strong>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openCourse} timeout="auto" unmountOnExit>
                        {user.role==='Manager'&&<Link to="/addCourses">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}} primary="Add Course" />
                            </ListItem>
                        </Link>}
                        <Link to="/allCourses">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="All Course" />
                            </ListItem>
                        </Link>
                        
                    </Collapse>
                    {/*---------------------------course section end---------------*/}
                    
                    {/*---------------------------offerList start---------------*/}
                    <ListItem button className={classes.sideMenuItems} onClick={()=>{handleClick(setOpenOfferList,openOfferList);}}>
                        <PeopleOutlineIcon className={classes.drawerIcons} />
                        <ListItemText  className={clsx({[classes.displayNone]:!open})} primary={"offerList"}></ListItemText>
                        <strong className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openOfferList ? <RemoveIcon /> : <AddIcon />}</strong>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openOfferList} timeout="auto" unmountOnExit>
                        <Link to="/addAdbisingList">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="Upload Advising List" />
                            </ListItem>
                        </Link>
                        <Link to="/getOfferList">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="New OfferList" />
                            </ListItem>
                        </Link>
                        
                    </Collapse>
                     {/* ---------------------------offerList end--------------- */}

                     {/* ------------------------------Routine section starts----------- */}
                     <ListItem button onClick={()=>{handleClick(setOpenRoutine,openRoutine);}} className={classes.sideMenuItems}>
                        <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"Routine"}></ListItemText>
                        <span className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openRoutine ? <RemoveIcon /> : <AddIcon />}</span>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openRoutine} timeout="auto" unmountOnExit>
                        <Link to="/manageRoutineExternals">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}} primary="Manage Routine External" />
                            </ListItem>
                        </Link>
                       <Link to="/routine">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText classes={{primary:classes.listItem}}  primary="New Routine"/>
                            </ListItem>
                        </Link>
                        
                    </Collapse>

                     {/* ------------------------------Routine section Ends----------- */}
                
                    <Link to="/result"><ListItem className={classes.sideMenuItems}>
                        <AssignmentOutlinedIcon  className={classes.drawerIcons}></AssignmentOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"result"}></ListItemText>
                    </ListItem></Link>
                </List>
        
            </Drawer>
            
        </div>
    );
};

export default Sidebar;
