import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import RedditTypesCheckboxGroup from './RedditTypes.js';

export default function BotDetailsForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        bot definition
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="botName"
            name="botName"
            label="bot name"
            fullWidth
            variant="outlined"
            helperText="the name of your bot."
          />
        </Grid>
        <RedditTypesCheckboxGroup />
        <Grid item xs={12}>
          <ChipInput
            required
            multiline
            id="subreddits"
            name="subreddits"
            label="subreddits"
            fullWidth
            variant="outlined"
            helperText="subreddits to react to. one per line."
            InputProps={{
              startAdornment: <InputAdornment position="start">/r/</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
