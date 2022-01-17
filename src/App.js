import React, { useState, useContext } from 'react';
import './App.css';
import { Grid, Card, Button, Divider, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import DetailsCard from './components/DetailsCard/DetailsCard';
import MainPanel from './components/MainPanel/MainPanel';
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';
import NewTransactionForm from './components/MainPanel/NewTransactionForm/NewTransactionForm';
import FilterCard from './components/MainPanel/FilterCard/FilterCard'
import { ExpensesManagerContext } from './context/context';
import useStyles from './styles';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import CustomAppBar from './components/CustomAppBar/CustomAppBar';

const App  = ({ signOut }) => {

  
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

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
            <Grid item xs={12} sm={5} className={classes.main}>
              <MainPanel />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.mobile}>
              <DetailsCard transactionType="Income" />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.desktop}>
              <DetailsCard transactionType="Income" />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.last}>
              <DetailsCard transactionType="Expense" />
            </Grid>
          </Grid>

          <Grid style={{ height: '10vh' }}>
          </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer> 
        </div>
      )
}

export default withAuthenticator(App);