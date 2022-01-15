import React, { useState, useContext } from 'react'
import { Grid, AppBar, Button, Divider, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { ExpensesManagerContext } from '../../context/context';
import useStyles from './styles';

const CustomAppBar = ({ handleDelete, handleSignOut }) => {

    const classes = useStyles();

    const handleMenu = (e) => {
        setanchorE1(e.currentTarget);
    };
    
    const handleClose = () => {
        setanchorE1(null);
    };
    
    const { balance } = useContext(ExpensesManagerContext);

    const [anchorE1, setanchorE1] = useState(null);

    return (
          <AppBar className={classes.appbar}>
            <Grid container spacing = {0} alignItems="center">
            <div>
              <IconButton 
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                disableScrollLock={true}
                anchorE1={anchorE1}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                open={Boolean(anchorE1)}
                onClose={handleClose}    
              > 
                <MenuItem onClick={handleSignOut}>
                  Sign out
                </MenuItem>
                <Divider style={{margin: '5px'}}/>
                <MenuItem onClick={handleDelete}>
                  Delete account
                </MenuItem>
              </Menu>
              </div>
              <Typography className={classes.balanceText} variant="button">Total Balance: ${balance}</Typography>
            </Grid>
          </AppBar>
    )
}

export default CustomAppBar
