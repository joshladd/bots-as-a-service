import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
  	margin: theme.spacing(1),
  },
}));

export default function TopNavigationBar() {
	const classes = useStyles();

  let botsVariant = 'text';
  let botsDisabled = false;
  let createVariant = 'text';
  let createDisabled = false;

  switch (window.location.pathname) {
    case '/bots-as-a-service/bots':
      botsVariant = 'outlined';
      botsDisabled = true;
      break;
    case '/bots-as-a-service/create':
      createVariant = 'outlined';
      createDisabled = true;
      break;
    default: break;
  }

	return (
		<AppBar position="absolute" color="default" className={classes.appBar}>
	    <Toolbar>
	      <Typography variant="h6" color="inherit" noWrap className={classes.title}>
	        bots-as-a-service
	      </Typography>

	      <Button
          className={classes.menuButton}
          color="inherit"
          href="/bots-as-a-service/bots"
          variant={botsVariant}
          disabled={botsDisabled}
        >
          bots
        </Button>
	      <Button
           className={classes.menuButton}
           color="inherit"
           href="/bots-as-a-service/create"
           variant={createVariant}
           disabled={createDisabled}
        >
           create
         </Button>
	    </Toolbar>
	  </AppBar>
	);
}
