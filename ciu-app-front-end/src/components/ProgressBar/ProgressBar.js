import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, makeStyles } from '@material-ui/core';


const useStyle=makeStyles(theme=>({
    root:{
        ['& strong']:{
            fontSize:"16px",
            color:'#070764',
        }
    },
    circularProgress:{
        color:'#b40241',
    },
    
}))
function CircularProgressWithLabel(props) {
    const classes=useStyle();
    return (
      <Box className={classes.root} position="relative" display="inline-flex">
        <CircularProgress variant="determinate" size="70px" className={classes.circularProgress} {...props}  />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <Typography variant="caption"  component="div" color="textSecondary"><strong>{`${Math.round(
            props.value,
          )}%`}</strong></Typography>
        </Box>
        
      </Box>
    );
}
  
const ProgressBar = (props) => {
    const [progress, setProgress] = React.useState(10);
    useEffect(() => {
        const timer =setProgress(props.value);
        return () => {
        clearInterval(timer);
        };
    }, []);
    return (
        <Grid item xs={6} lg={2} style={{textAlign:'center'}}>
            <CircularProgressWithLabel value={progress} />
            <h4 style={{margin:0,fontWeight:'700',color:'#070764'}}>Math 101</h4>
            <small><strong style={{color:'gray'}}>5 classes</strong></small>
            
        </Grid>
    );
};

export default ProgressBar;