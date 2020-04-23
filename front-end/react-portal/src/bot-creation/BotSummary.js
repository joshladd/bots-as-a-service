import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';



const styles = (theme) => ({
});

class BotSummary extends React.Component {
  constructor(props){
    super(props);
    console.log("evan", props.payload);
  }

  render() {
    const { classes } = this.props;
    console.log(classes);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          summary
        </Typography>
        <Grid container spacing={2}>
        </Grid>
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(BotSummary);
