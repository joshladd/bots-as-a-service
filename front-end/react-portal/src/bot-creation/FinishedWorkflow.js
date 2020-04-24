import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {
  Link
} from "react-router-dom";

function StatusPanel({ payload }) {
  const [stage, setStage] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [currentErrorMessage, setErrorMessage] = React.useState("oh no! an unknown error has occurred.");

  const handleLifeCycle = () => {
    switch(stage) {
      case 0:
        setStage(stage + 1);
        break;
      case 1:
        setStage(stage + 1);
        break;
      case 2:
        setStage(stage + 1);
        break;
      case 3:
        setStage(stage + 1);
        break;
      case 4:
        break;
      default:
        setErrorMessage("oh no! you have somehow escaped our lifecycle through mysterious means. please try again.");
        setHasError(true);
        break;
    }
  }

  useEffect(() => {
    setTimeout(function () {handleLifeCycle()}, 1000);
  })
  
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 0 && stage != 4} timeout={500}>
          <LinearProgress />
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 0} timeout={500}>
          <Alert severity="info">we're bringing your bot to life. wow!</Alert>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 1} timeout={500} >
          <Alert severity="warning">gathering extra nuts and bolts...</Alert>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 2} timeout={500} >
          <Alert severity="warning">bribing our bot-maker bots...</Alert>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 3} timeout={500} >
          <Alert severity="warning">cutting the umbilical cable...</Alert>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={stage >= 4} timeout={500} >
          <Alert severity="success"
          action={
            <Button color="inherit" size="small" href="#/bots">
              GO SEE
            </Button>
          }
          >congratulations, it's a bot! all done. </Alert>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grow in={hasError} timeout={500} >
          <Alert severity="error">{currentErrorMessage}</Alert>
        </Grow>
      </Grid>
    </Grid>
  );
}

export default function FinishedWorkflow({ props }) {
  const transformData = () => {

    const data = {
      0: {
        botData: {},
        nameInput: {val: "coolbot", hasError: false, helperText: "the name of your bot."},
        typeInput: {hasError: false},
        subredditInput: {
          hasError: false,
          helperText: "one or more subreddits to operate in.",
          val: ["test", "test2"]
        },
      },
      1: {
        alertShown: false,
        fandom: {hasError: false, isEnabled: false, isAvailable: true, invocation: {
          symbol: "!",
          term: "fandom",
          query: "[[ ]]"
        }, inputs: {
          fandom_name: {
            isErrored: false,
            val: "baas",
          }
        }},
        translate: {hasError: false, isEnabled: true, isAvailable: true,
          invocation: {
            symbol: "!",
            term: "translate",
            query: "[[ ]]",
          }
      },
        flights: {hasError: false, isEnabled: false, isAvailable: false},
      }
    }

    let newData = {
      name: data[0].nameInput.val,
      auth: {
        username: "testing_dummy",
        password: "leo030811",
        user_agent: "baas/1.0",
        client_id: null,
        client_secret: null,
      },
      services: [],
      status: {
        online: false,
      },
      subreddits: data[0].subredditInput.val,
      version_info: {
        description: "A cool bot!",
        name: data[0].nameInput.val,
        version: "1.0",
      }
    }

    Object.entries(data[1]).map(([serviceName, serviceConfig]) => {
      if (typeof serviceConfig == "object" && serviceConfig.isEnabled) {
        let params = {};
        switch (serviceName) {
          case "fandom":
            params.url = `https://${serviceConfig.inputs.fandom_name.val}.fandom.com/`
            break;
          case "translate":
            params.default_language = "english";
            break;
          default:
            break;
        }

        let thisServiceData = {
          service_name: serviceName,
          invocation: serviceConfig.invocation,
          language: "english",
          params: params,
        }
        newData.services.push(thisServiceData);
      }
    });

    return newData;
  }

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        creating your bot
      </Typography>
      <Typography variant="subtitle1">
        <StatusPanel payload={ transformData() } />
      </Typography>
    </React.Fragment>
  );
}
