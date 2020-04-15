import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import RedditTypesCheckboxGroup from './RedditTypes.js';

export default class BotDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      botData: {},
      nameInput: {
        hasError: false,
        helperText: "the name of your bot.",
      },
      typeInput: {
        hasError: false,
      },
      subredditInput: {
        hasError: true, // Stupid workaround -- just set this to having an error initially to prevent user
                        // from immediately clicking NEXT
        helperText: "one or more subreddits to operate in."
      }
    }

    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onSubredditInputChange = this.onSubredditInputChange.bind(this);
  }

  onNameInputChange(event) {
    const newValue = event.target.value;
    let forbiddenCharacters = /[^\d\w-]/;
    let hasError = false;
    let newHelperText = "the name of your bot.";
    if (newValue.length > 64){
      hasError = true;
      newHelperText = "your name is too long (must be < 64 chars).";
    } else if (forbiddenCharacters.test(newValue)) {
      hasError = true;
      newHelperText = "you can only use alphanumeric characters, dash (-), or underscope (_).";
    } else {
      hasError = false;
      newHelperText = "the name of your bot.";
    }

    let newState = Object.assign({}, this.state);
    if (!hasError) {
      newState.botData.name = newValue;
    }
    else {
      newState.botData.name = null;
    }
    newState.nameInput = {
      hasError: hasError,
      helperText: newHelperText,
    }
    this.setState(newState);
  }

  onSubredditInputChange(event, value, reason) {
    let newState = Object.assign({}, this.state);
    let hasError = value.length === 0;
    newState.botData.targets = hasError ? null : value;
    newState.subredditInput.hasError = hasError
    this.setState(newState);
  }

  returnDataOrNull () {
    // This will give us validation.
    // Return null if there are any errors.
    let anyHasError = this.state.nameInput.hasError || this.state.typeInput.hasError || this.state.subredditInput.hasError
    if (anyHasError) {
      return null;
    }
    else {
      let payload = this.state.botData;
      return payload;
    }
  }

  // Probably want to look at https://www.reddit.com/dev/api/#GET_api_subreddit_autocomplete_v2
  render () {
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
              error={this.state.nameInput.hasError}
              helperText={this.state.nameInput.helperText}
              onChange={this.onNameInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">/u/</InputAdornment>,
              }}
            />
          </Grid>
          <RedditTypesCheckboxGroup />
          <Grid item xs={12}>
            <Autocomplete
              required
              multiple
              selectOnFocus
              onChange={this.onSubredditInputChange}
              options={subreddits}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={"/r/" + option} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField {...params} variant="outlined" label="subreddits" error={this.state.subredditInput.hasError} />
              )}
            />
            <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
              {this.state.subredditInput.helperText}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

// STUB DATA
const subreddits = [
  "test",
  "test1",
  "test2",
  "test3"
]
