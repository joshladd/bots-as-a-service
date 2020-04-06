import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function ServicesForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        services
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField required id="services" label="services" fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
