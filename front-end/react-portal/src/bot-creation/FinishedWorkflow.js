import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FinishedWorkflow() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        creating your bot!
      </Typography>
      <Typography variant="subtitle1">
        <LinearProgress />
        we're bringing your bot to life. wow!
      </Typography>
    </React.Fragment>
  );
}
