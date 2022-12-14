import { AppBar, Badge, Grid, IconButton, makeStyles} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import './Header.css';
import Sidebar from '../Sidebar/Sidebar';
import { contextUser } from '../../App';
import { TiThMenu } from "react-icons/ti";


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
    SidebarOpen:{
        
        [theme.breakpoints.up('sm')]:{
            display:'none'
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
    const [,setUser,,]=useContext(contextUser);

    const handleShift=(value)=>{
        setAppbarShift(value)
    }
    const clickLogOut=()=>{
        setUser({email:""});
        sessionStorage.removeItem('user');
        

    }
    return (
        <div className={classes.root}>
            
            <AppBar position='fixed' className={clsx(classes.menu,classes.appBar,{[classes.shiftAppBar]:appbarShift})} >
                <Grid container >
                    <Grid item xs={12} lg={12}>
                    {/* <strong style={{color:'black'}}>as <TiThMenu></TiThMenu></strong> */}
                        <div style={{float:"right"}}>
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
                                <Badge onClick={()=>{clickLogOut()}}><PowerSettingsNewIcon ></PowerSettingsNewIcon></Badge>
                            </IconButton>
                        </div>
                        

                    </Grid>

                </Grid>
            </AppBar>
            <Sidebar shift={handleShift}></Sidebar>
        </div>
    );
};

export default Header;