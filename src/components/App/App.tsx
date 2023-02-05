import DeliveryForm from '../DeliveryForm/DeliveryForm';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import classes from './App.module.css'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        className={classes.AppBg}
      >
        <DeliveryForm />
      </Grid>
    </React.Fragment>
  );
};

export default App;
