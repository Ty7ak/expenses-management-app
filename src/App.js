import React, { useState, useContext } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { createTheme } from '@material-ui/core/styles';

import MainPanel from './components/MainPanel/MainPanel';
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';
import { ExpensesManagerContext } from './context/context';
import useStyles from './styles';
import ChartPanel from './components/ChartPanel/ChartPanel';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CustomAppBar from './components/CustomAppBar/CustomAppBar';

const App  = ({ signOut }) => {

  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleDeleteCognitoUser = async () => {
    setOpenDeleteUser(true);
  }

  const { balance } = useContext(ExpensesManagerContext);

  const classes = useStyles();

  return (
        <div className="App">
          <ConfirmationDialog open={openDeleteUser} setOpen={setOpenDeleteUser} />
          <CustomAppBar handleDeleteUser={handleDeleteCognitoUser} handleSignOut={signOut}/>

          <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center"> 
            <Grid item xs={12} sm={5} className={classes.main} style={{ display: 'flex' }}>
              <MainPanel />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.main} style={{ display: 'flex' }}>
              <ChartPanel />
            </Grid>
          </Grid>
        </div>
      )
}

export default withAuthenticator(App);