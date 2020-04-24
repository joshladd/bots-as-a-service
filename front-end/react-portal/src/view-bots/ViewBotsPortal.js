import React, { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import ViewBotsPanel from './support/ViewBotsPanel';


export default function ViewBotsPortal(){
	useEffect(() => {
		document.title = 'bots-as-a-service: bots';
		if (!loadedIn) {
			if (!isLoading) {
				setIsLoading(true);
				fetch("https://us-central1-bots-as-a-service.cloudfunctions.net/get-bots")
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						setBotsList(data.map((payload) =>
							<ViewBotsPanel key={payload.name} payload={payload} />
						))
						setLoadedIn(true);
					})

				// setBotsList(fakeResponse.map((payload) =>
			 	// 	<ViewBotsPanel key={payload.name} payload={payload} />
			 	// ))
				// setLoadedIn(true);
			}
		}
	})

	const [loadedIn, setLoadedIn] = React.useState(false);
	// Flag to ensure only one thread starts making network requests + loading data.
	const [isLoading, setIsLoading] = React.useState(false);
	const [botsList, setBotsList] = React.useState([]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				<Typography variant="h3" gutterBottom>
					bots
				</Typography>
				{	loadedIn ? botsList : (
					<Container>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Skeleton animation="wave" height={10} width="30%" />
							</ExpansionPanelSummary>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Skeleton animation="wave" height={10} width="30%" />
							</ExpansionPanelSummary>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Skeleton animation="wave" height={10} width="30%" />
							</ExpansionPanelSummary>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Skeleton animation="wave" height={10} width="30%" />
							</ExpansionPanelSummary>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Skeleton animation="wave" height={10} width="30%" />
							</ExpansionPanelSummary>
						</ExpansionPanel>
					</Container>
				)}
			</Container>
		</React.Fragment>
	);
}

// STUB
const fakeResponse = [
	{
	  "name": "example-on",
	  "auth": {
	      "client_id": "B-pVZ2UJucTJ7Q",
	      "client_secret": "bS9f3mP6oeeMUy7eWkksohwoazs",
	      "password": "leo030811",
	      "user_agent": "bot for testing other bots",
	      "username": "testing_dummy"
	  },
	  "services": [
	    {
	      "language": "english",
	      "invocation": {
	        "symbol": "!",
	        "term": "fandom",
	        "query": "[[ ]]"
	      },
	      "params": {
	        "url": "https://naruto.fandom.com/"
	      },
	      "service_name": "fandom"
	    },
	    {
	      "language": "english",
	      "invocation": {
	        "symbol": "!",
	        "term": "translate",
	        "query": "[[ ]]"
	      },
	      "params": {
	        "default_language": "english"
	      },
	      "service_name": "translate"
	    }
	  ],
	  "status": {
	    "online": true
	  },
	  "subreddits": [
	    "botsasaservice_test"
	  ],
	  "version_info": {
	    "description": "A bot to be a test account for our bot platform",
	    "name": "BaaS testing bot",
	    "version": "v1.0"
	  }
	},
	{
	  "name": "example-off",
	  "auth": {
	      "client_id": "B-pVZ2UJucTJ7Q",
	      "client_secret": "bS9f3mP6oeeMUy7eWkksohwoazs",
	      "password": "leo030811",
	      "user_agent": "bot for testing other bots",
	      "username": "testing_dummy"
	  },
	  "services": [
	    {
	      "language": "english",
	      "invocation": {
	        "symbol": "!",
	        "term": "fandom",
	        "query": "[[ ]]"
	      },
	      "params": {
	        "url": "https://naruto.fandom.com/"
	      },
	      "service_name": "fandom"
	    }
	  ],
	  "status": {
	    "online": false
	  },
	  "subreddits": [
	    "botsasaservice_test"
	  ],
	  "version_info": {
	    "description": "A bot to be a test account for our bot platform",
	    "name": "BaaS testing bot",
	    "version": "v1.0"
	  }
	}
]
