import React, { useState, useContext } from 'react'

import { Grid, AppBar, Divider, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { ExpensesManagerContext } from '../../context/context';
import AddCurrencyToAmount from '../../utils/AddCurrencyToAmount';
import InfoButton from '../InfoButton/InfoButton';
import useStyles from './styles';

const CustomAppBar = ({ handleDeleteUser, handleSignOut }) => {

    const classes = useStyles();

    const handleMenu = (e) => {
        setanchorE1(e.currentTarget);
    };
    
    const handleClose = () => {
        setanchorE1(null);
    };
    
    const { totalBalance } = useContext(ExpensesManagerContext);

    const [anchorE1, setanchorE1] = useState(null);

    return (
          <AppBar className={classes.appbar}>
            <Grid container spacing = {0} alignItems="center">
            <div>
              <IconButton
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                disableScrollLock={true}
                anchorE1={anchorE1}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                keepMounted
                open={Boolean(anchorE1)}
                onClose={handleClose}    
              > 
                <MenuItem onClick={handleSignOut}>
                  Sign out
                </MenuItem>
                <Divider style={{margin: '5px'}}/>
                <MenuItem onClick={handleDeleteUser}>
                  Delete account
                </MenuItem>
              </Menu>
              </div>
              <InfoButton />
              <Typography
                className={classes.balanceText}
                variant="button"
              >
                Total Balance: {AddCurrencyToAmount(totalBalance)}
              </Typography>
            </Grid>
          </AppBar>
    )
}

export default CustomAppBar
