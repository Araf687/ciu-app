import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

function ClashedNotification(props) {
    const [open,setOpen] =React.useState(true);
    const data=props.data;
    const handleClose=()=>{
        setOpen(false);
    }
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
      <Grid container>
          <Grid></Grid>
      </Grid>
  </Dialog>
  )
}

export default ClashedNotification