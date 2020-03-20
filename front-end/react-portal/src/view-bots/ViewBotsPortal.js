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

	const botsList = fakeResponse.map((payload) =>
		<ViewBotsPanel key={payload.name} payload={payload} />
	)

	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				{botsList}
			</Container>
		</React.Fragment>
	);
}

// STUB
const fakeResponse = [
  {
    "name": "stopped-bot01",
    "auth" : {
        "client_id": "",
        "client_secret" : "",
        "user_agent" : "",
        "username": ""
    },
    "status" : {
        "online": false,
        "valid": true
    },
    "config" : {
        "valid": true,
        "subreddits" : ["test"],
        "comments_enabled": true,
        "livestream_enabled": false,
        "comment_calling_syntax" : "!",
        "services": []
    }
  },
	{
    "name": "healthy-bot02",
    "auth" : {
        "client_id": "",
        "client_secret" : "",
        "user_agent" : "",
        "username": ""
    },
    "status" : {
        "online": true,
        "valid": true
    },
    "config" : {
        "valid": true,
        "subreddits" : ["test"],
        "comments_enabled": true,
        "livestream_enabled": false,
        "comment_calling_syntax" : "!",
        "services": []
    }
  },
	{
    "name": "invalid-bot03",
    "auth" : {
        "client_id": "",
        "client_secret" : "",
        "user_agent" : "",
        "username": ""
    },
    "status" : {
        "online": false,
        "valid": false
    },
    "config" : {
        "valid": true,
        "subreddits" : ["test"],
        "comments_enabled": true,
        "livestream_enabled": false,
        "comment_calling_syntax" : "!",
        "services": []
    }
  }
]
