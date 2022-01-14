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
import Sidebar from '../Sidebar/Sidebar';


const drawerWidth=220;
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
    const [appbarShift,setAppbarShift]=useState(false);
    const handleShift=(value)=>{
        setAppbarShift(value)
    }
    return (
        <div className={classes.root}>
            
            <AppBar position='fixed' className={clsx(classes.menu,classes.appBar,{[classes.shiftAppBar]:appbarShift})} >
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
            <Sidebar shift={handleShift}></Sidebar>
        </div>
    );
};

export default Header;