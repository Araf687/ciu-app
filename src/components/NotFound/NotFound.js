import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import ciuLogo from '../../image/ciuLogo.png';
import notFound from '../../image/notFound.svg';
import {
    Link
  } from "react-router-dom";

const useStyles=makeStyles(theme=>({
    cardAuth:{
        width:'85%',
        borderRadius: '10px',
        background:' #f5f5f5',
        border: '5px solid #fff',
        boxShadow: '0 0 16px rgb(41 42 51 / 6%), 0 6px 20px rgb(41 42 51 / 2%)',
        padding:'20px 15px',

    },
    authHeader:{
        textAlign:'center',
    },
    authBody:{
        textAlign:'center',
        paddingTop:"30px",
        '& a':{
            textDecoration:'none',
            fontSize:'18px',
            color:'#0c7ce6',
            '&:hover':{
                color:'#070764'
            },
        }

    },
    homePgBtn:{
        width:"100%",
        background:'#0c7ce6',
        '&:hover':{
            background:'#070764'
        }
    },
    

}));

const NotFound = () => {
    const classes=useStyles();
    const history=useHistory();

    const handleHomePgClick=()=>{
        console.log('click');
        history.replace("/");
    }
    return (
        <Container style={{display:'flex',alignItems:'center',height:'100vh'}}>
            <Grid container>
                <Grid item lg={4} xs={12}>
                    <div className={classes.cardAuth}>
                        <div className={classes.authHeader}>
                            <img src={ciuLogo} style={{height:'150px'}} alt="" />
                            <p style={{margin:'0',fontSize:'28px'}}>Error 404</p>
                            <span>Page not found</span>
                        </div>
                        <div className={classes.authBody}>
                            <Button onClick={handleHomePgClick} variant="contained"className={classes.homePgBtn} size="small" color="secondary">
                                GO TO HOMEPAGE
                            </Button>
                            <p><Link>Need Help?</Link></p>
                        </div>

                    </div>

                </Grid>
                <Grid item lg={8} xs={12}>
                    <img src={notFound}  style={{width:'100%'}} alt="" />
                </Grid>
            </Grid>
            
        </Container>
    );
};

export default NotFound;