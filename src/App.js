import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';

import DetailsCard from './components/DetailsCard/DetailsCard';
import MainPanel from './components/MainPanel/MainPanel';
import useStyles from './styles';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const App  = () => {
  const classes = useStyles();

  return (
    <Authenticator>
      {({ signOut, user }) => (

  
        <div className="App">
          <p>
            Hey {user.username}, welcome to my channel, with auth!
          </p>
          <button onClick={signOut}>Sign out</button>
          <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }}> 
            <Grid item xs={12} sm={3}>
              <DetailsCard title="Income" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <MainPanel />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DetailsCard title="Expense" />
            </Grid>
          </Grid>
        </div>


      )}
    </Authenticator>
  );
}

export default App;