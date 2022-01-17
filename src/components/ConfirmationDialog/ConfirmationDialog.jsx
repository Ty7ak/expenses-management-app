import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';

import useStyles from './styles';
  
  const ConfirmationDialog = ({ open, setOpen }) => {

    const handleConfirm = async (reason) => {
        if(reason === 'clickaway') return;

        const user = await Auth.currentAuthenticatedUser();

        user.deleteUser((error) => {
          if (error) {
            throw error;
          }    
    
        window.location.reload();
        });
        setOpen(false);
    }

    const handleClose = (reason) => {
        if(reason === 'clickaway') return;
        setOpen(false);
    }

    const classes = useStyles();

    return (
      <Dialog 
        className={classes.dialog} 
        open={open} 
        onClose={handleClose} 
        fullWidth
      >
        <DialogTitle>Deleting account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action is irreversible.</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            color="secondary" 
            variant="outlined" 
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;