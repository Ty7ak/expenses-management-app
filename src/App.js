import React, { useState, useContext } from 'react';
import './App.css';
import { Grid, AppBar, Button, Divider, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';

import DetailsCard from './components/DetailsCard/DetailsCard';
import MainPanel from './components/MainPanel/MainPanel';
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';
import { ExpensesManagerContext } from './context/context';
import useStyles from './styles';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

const App  = ({ signOut }) => {

  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [anchorE1, setanchorE1] = useState(null);

  const handleDeleteCognitoUser = async () => {
    setOpenDeleteUser(true);
  }

  const handleMenu = (e) => {
    setanchorE1(e.currentTarget);
  };

  const handleClose = () => {
    setanchorE1(null);
  };

  const { balance } = useContext(ExpensesManagerContext);

  const classes = useStyles();

  return (
        <div className="App">
          <ConfirmationDialog open={openDeleteUser} setOpen={setOpenDeleteUser} />
          <AppBar className={classes.appbar}>
            <Grid container spacing = {0} justifyContent="left" alignItems="center">
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
                <MenuItem onClick={signOut}>
                  Sign out
                </MenuItem>
                <Divider style={{margin: '5px'}}/>
                <MenuItem onClick={handleDeleteCognitoUser}>
                  Delete account
                </MenuItem>
              </Menu>
              </div>
              <Typography className={classes.balanceText} variant="button">Total Balance: ${balance}</Typography>
            </Grid>
          </AppBar>
          <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }}> 
            <Grid item xs={12} sm={3} className={classes.mobile}>
              <DetailsCard title="Income" />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.main}>
              <MainPanel />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.desktop}>
              <DetailsCard title="Income" />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.last}>
              <DetailsCard title="Expense" />
            </Grid>
          </Grid>
          <Grid style={{ height: '40vh' }}>
          </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer> 
        </div>
      )
}

export default withAuthenticator(App);