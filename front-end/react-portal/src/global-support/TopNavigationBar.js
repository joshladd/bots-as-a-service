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

	return (
		<AppBar position="absolute" color="default" className={classes.appBar}>
	    <Toolbar>
	      <Typography variant="h6" color="inherit" noWrap className={classes.title}>
	        bots-as-a-service
	      </Typography>

	      <Button className={classes.menuButton} color="inherit" href="/bots">bots</Button>
	      <Button className={classes.menuButton} color="inherit" href="/create">create</Button>
	    </Toolbar>
	  </AppBar>
	);
}