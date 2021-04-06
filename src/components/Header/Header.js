import { AppBar, Badge, Divider, Drawer, Grid, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SmsIcon from '@material-ui/icons/Sms';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';

const drawerWidth=250;
const drawerIconWidth=80;

const useStyle=makeStyles(theme=>({
    root:{
        display:'flex',
    },
    appBar:{
        width: `calc(100% - ${drawerIconWidth}px)`,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),
        backgroundColor:'white',
        [theme.breakpoints.up('md')]:{
            paddingRight:'50px',
        }


    },
    shiftAppBar:{
        width: `calc(100% - ${drawerWidth}px)`,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),

    },
    searchPortion:{
        backgroundColor:'white',

    },
    navIcons:{
        color:'#040136',
        margin:'6px 20px 6px 0px',
        borderRadius:'5px',
        padding:'8px',
        ['&:hover']:{
            backgroundColor:'#040136',
            color:'white',

        }
    },
    drawer:{
        width:drawerWidth,
        backgroundColor:'lightgrey',

    },
  
    drawerOpen:{
        width:drawerWidth,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),
        backgroundColor:'#e9e9f0',

    },
    drawerClose:{
        width:drawerIconWidth,
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),
        backgroundColor:'#f5f5fa',

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
        margin:'20px 0px',
        ['& img']:{
            border:'5px solid white',
            height:'60px',
            width:'60px',
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
    search:{
        height:'30px',
        margin:'10px 10px',
        padding:'0px 5px',
        border:'2px solid lightgrey',
        [theme.breakpoints.up('sm')]:{
            width:'500px',
        },
        borderRadius:'8px',


    }

}))

const Header = () => {

    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const userImg='https://lh3.googleusercontent.com/proxy/j6FrzaXiDyEYacL9YX4gkbJzOZBhYOA6cGFX-_Bl2i_ZI7ckikxgc2PGovFOvZOKvDvE1xaaqyzq6U_6wQoHKZJD93PxsRjzM89Uezu6L8u86Q57';
    const userId='RabiulHossain@ciu.edu.bd'
    const clickHandle =()=>
    {
        setOpen(!open)
    }

    
    const sideMenu=(
        <Drawer  
        variant='permanent'
        className={clsx(classes.drawer,{[classes.drawerOpen]:open,[classes.drawerClose]:!open})}
        classes={{ paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >

            <List >
                <ListItem  >
                    
                        <MenuIcon
                                onClick={clickHandle}
                                className='drawerIcons'
                                
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
                <ListItem className='sideMenuItems'>
                    <GroupIcon className='drawerIcons' id='x'></GroupIcon>
                    <ListItemText  primary="students"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <PeopleOutlineIcon className='drawerIcons' />
                    <ListItemText  primary="teachers"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <ListAltIcon className='drawerIcons'/>
                    <ListItemText primary="offerlist"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <AssignmentIcon className='drawerIcons'></AssignmentIcon>
                    <ListItemText  primary="result"></ListItemText>
                </ListItem>
            </List>
    
        </Drawer>);

   

    return (
        <div className={classes.root}>
            
            <AppBar position='fixed' className={clsx(classes.menu,classes.appBar,{[classes.shiftAppBar]:open})} >
                <Grid container >
                    <Grid className={classes.searchPortion}>
                        <div >
                            
                            <InputBase 
                            className={classes.search} 
                            placeholder='search ..'
                            startAdornment={<SearchIcon fontSize='small'/>}
                            >

                            </InputBase>

                        </div>
                        
                    </Grid>
                    <Grid item md></Grid>
                    <Grid >
                        <IconButton className={classes.navIcons}>
                            <Badge><EmailIcon ></EmailIcon></Badge>
                        </IconButton>
                        <IconButton className={classes.navIcons}>
                            <Badge ><NotificationsIcon /></Badge>
                        </IconButton>
                        <IconButton className={classes.navIcons}>
                            <Badge><SmsIcon ></SmsIcon></Badge>
                        </IconButton>
                        <IconButton className={classes.navIcons}>
                            <Badge><PowerSettingsNewIcon ></PowerSettingsNewIcon></Badge>
                        </IconButton>

                    </Grid>

                </Grid>
            </AppBar>
            {sideMenu}
        </div>
    );
};

export default Header;