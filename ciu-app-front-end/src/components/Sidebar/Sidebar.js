import { AppBar, Badge, Collapse, Divider, Drawer, Grid, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, Toolbar } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import userImg from '../../image/rabiul.jpg';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
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

    const [,,,setAddOptions]=useContext(contextUser);
   
    

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
                        <strong>{userId}</strong>
                    </div>
                    <Divider></Divider>
                </List>
                <List>
                    <Link to=""><ListItem className={classes.sideMenuItems}>
                        <HomeOutlinedIcon className={classes.drawerIcons}></HomeOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"Dashboard"}></ListItemText>
                    </ListItem></Link>
                    <ListItem button onClick={()=>{handleClick(setStudentOpenList,openStudentList);}} className={classes.sideMenuItems}>
                        <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"students"}></ListItemText>
                        <span className={clsx({[classes.displayNone]:!open},classes.listIcon)}>{openStudentList ? <RemoveIcon /> : <AddIcon />}</span>
                    </ListItem>
                    <Collapse className={clsx({[classes.displayNone]:!open},classes.collapseList)} in={openStudentList} timeout="auto" unmountOnExit>
                        <Link to="/allStudents">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText primary="All Students" />
                            </ListItem>
                        </Link>
                        <Link to="/addStudents">
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText primary="Add Students" onClick={()=>{setAddOptions({title:"Add student",fieldName:"Student Id", fetchUrl:"addStudent"})}}/>
                            </ListItem>
                        </Link>
                        <Link>
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </Link>
                        
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
                                <ListItemText primary="All Teachers" />
                            </ListItem>
                        </Link>
                        <Link to="/addTeachers" onClick={()=>{setAddOptions({title:"Add Teacher",fieldName:"Teacher Id", fetchUrl:"addTeacher"})}}>
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText primary="Add Teachers" />
                            </ListItem>
                        </Link>
                        <Link>
                            <ListItem button>
                                <PeopleAltOutlinedIcon className={classes.drawerIcons}></PeopleAltOutlinedIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </Link>
                        
                    </Collapse>
                
                    <Link to="/offerlist"><ListItem className={classes.sideMenuItems}>
                        <ListAltIcon className={classes.drawerIcons}/>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"offerlist"}></ListItemText>
                    </ListItem></Link>
                
                    <Link to=""><ListItem className={classes.sideMenuItems}>
                        <AssignmentOutlinedIcon  className={classes.drawerIcons}></AssignmentOutlinedIcon>
                        <ListItemText className={clsx({[classes.displayNone]:!open})} primary={"result"}></ListItemText>
                    </ListItem></Link>
                </List>
        
            </Drawer>
            
        </div>
    );
};

export default Sidebar;
