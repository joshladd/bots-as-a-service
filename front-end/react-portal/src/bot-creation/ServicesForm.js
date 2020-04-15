import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ServicePanel from './support/ServicePanel';


export default class ServicesForm extends React.Component {
  returnDataOrNull () {
    // This will give us validation.
    // Return null if there are any errors.
    return null;
  }

  render () {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {
              serviceDefinitions.map((payload) => <ServicePanel key={payload.name} payload={payload} />)
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}


const serviceDefinitions = [
  {
    name: "fandom search",
    available: true,
    defaultOn: true,
    description: "Search the input fandom and return the top results.",
    configurableQuery: true,
    inputs: [
      {
        name: "name",
        helperText: "the fandom subdomain, i.e.: [name].fandom.com",
        adornments: {
          end: ".fandom.com",
        },
        flavor: "text",
        required: true,
        default: null,
        meta:{
          validation: {
            type: "request",
            target: "https://INPUT_TERM.fandom.com/api/v1/Mercury/WikiVariables"
          }
        }
      }
    ]
  },
  {
    name: "flight lookup",
    available: false,
    defaultOn: false,
    description: "Search for flight information.",
    configurableQuery: false,
    inputs: []
  }
]
