import { AppBar, Badge, Divider, Drawer, Grid, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, Toolbar } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import { contextMenuWidth } from '../../App';
import userImg from '../../image/rabiul.jpg';


const drawerWidth=250;
const drawerIconWidth=70;
const useStyle=makeStyles(theme=>({
    root:{
        display:'flex',
    },
    appBar:{
        width: `calc(100% - ${drawerIconWidth}px)`,
        boxShadow:'none',
        transition:theme.transitions.create(['width'],{
            duration:'1s',
        }),
        backgroundColor:'white',
        [theme.breakpoints.up('md')]:{
            paddingRight:'50px',
        },
        [theme.breakpoints.down('md')]:{
            width:'100%'
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
        margin:'3px 15px 0px 0px',
        borderRadius:'5px',
        padding:'4px 8px',
        ['&:hover']:{
            backgroundColor:'#040136',
            color:'white',

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
    // search:{
    //     height:'30px',
    //     margin:'10px 10px',
    //     padding:'0px 5px',
    //     border:'2px solid lightgrey',
    //     [theme.breakpoints.up('sm')]:{
    //         width:'500px',
    //     },
    //     borderRadius:'8px',


    // }

}))

const Header = () => {

    const classes=useStyle();
    const [open,setOpen]=useState(false);
    const [,setSideMenuWidth]=useContext(contextMenuWidth);
    const userId='RabiulHossain@ciu.edu.bd'
    const clickHandle =()=>
    {
        setOpen(!open);
        open?setSideMenuWidth(drawerIconWidth):setSideMenuWidth(drawerWidth);
    }

    
    const sideMenu=(
        <Drawer  
        variant='permanent'
        className={clsx(classes.drawer,{[classes.drawerOpen]:open,[classes.drawerClose]:!open})}
        classes={{ paper: clsx(classes.drawer,{
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
                    <HomeOutlinedIcon className='drawerIcons' id='x'></HomeOutlinedIcon>
                    <ListItemText className={clsx({[classes.displayNone]:!open})} primary="Dashboard"></ListItemText>
                </ListItem>
                <ListItem className='sideMenuItems'>
                    <PeopleAltOutlinedIcon className='drawerIcons' id='x'></PeopleAltOutlinedIcon>
                    <ListItemText className={clsx({[classes.displayNone]:!open})} primary="students"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <PeopleOutlineIcon className='drawerIcons' />
                    <ListItemText  className={clsx({[classes.displayNone]:!open})} primary="teachers"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <ListAltIcon className='drawerIcons'/>
                    <ListItemText className={clsx({[classes.displayNone]:!open})} primary="offerlist"></ListItemText>
                </ListItem>
            
                <ListItem className='sideMenuItems'>
                    <AssignmentOutlinedIcon  className='drawerIcons'></AssignmentOutlinedIcon>
                    <ListItemText className={clsx({[classes.displayNone]:!open})} primary="result"></ListItemText>
                </ListItem>
            </List>
    
        </Drawer>);

   

    return (
        <div className={classes.root}>
            
            <AppBar position='fixed' className={clsx(classes.menu,classes.appBar,{[classes.shiftAppBar]:open})} >
                <Grid container >
                    <Grid className={classes.searchPortion}>
                        ""
                        {/* <div >
                            
                            <InputBase 
                            className={classes.search} 
                            placeholder='search ..'
                            startAdornment={<SearchIcon fontSize='small'/>}
                            >

                            </InputBase>

                        </div> */}
                        
                    </Grid>
                    <Grid item md></Grid>
                    <Grid >
                        <IconButton className={classes.navIcons}>
                            <Badge><EmailOutlinedIcon ></EmailOutlinedIcon></Badge>
                        </IconButton>
                        <IconButton className={classes.navIcons}>
                            <Badge ><NotificationsNoneOutlinedIcon /></Badge>
                        </IconButton>
                        <IconButton className={classes.navIcons}>
                            <Badge><TextsmsOutlinedIcon/></Badge>
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