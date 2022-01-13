import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';

import useStyles from './styles';
  
  const ConfirmationDialog = ({ open, setOpen }) => {

    const handleConfirm = async (event, reason) => {
        if(reason === 'clickaway') return;

        const user = await Auth.currentAuthenticatedUser();
        user.deleteUser((error, data) => {
          if (error) {
            throw error;
          }    
    
        window.location.reload();
        });
        setOpen(false);
    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') return;
        setOpen(false);
    }

    const classes = useStyles();

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle id='alert-dialog-title'>Deleting account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action is irreversible.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;