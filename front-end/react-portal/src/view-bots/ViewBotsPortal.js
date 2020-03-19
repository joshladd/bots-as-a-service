import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ViewBotsPanel from './support/ViewBotsPanel';

const useStyles = makeStyles(theme => ({
	root: {
    width: '100%',
  }
}));

export default function ViewBotsPortal(){
	document.title = 'bots-as-a-service: bots';
	// eslint-disable-next-line
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				<ViewBotsPanel name="bot-1" />
				<ViewBotsPanel name="bot-2" />
				<ViewBotsPanel name="bot-3" />
			</Container>
		</React.Fragment>
	);
}
