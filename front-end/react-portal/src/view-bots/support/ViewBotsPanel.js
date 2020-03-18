import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles(theme => ({
	root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexGrow: 1,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    justifyContent: "flex-end"
  },
  deleteButton: {
  	color: theme.palette.error.dark,
  },
  startButton: {
  	color: theme.palette.primary.light,
  },
  pauseButton: {
  	color: theme.palette.primary.light,
  },
}));

export default function ViewBotsPanel(props){
	const classes = useStyles();
	return (
		<ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={props.name + "-header"}
      >
        <Typography className={classes.heading}>{props.name}</Typography>
        <Typography className={classes.secondaryHeading}>disabled</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
      	<Button
	        className={classes.startButton}
	        startIcon={<PlayArrowIcon />}
	      >
	        Start
	      </Button>
	      <Button
	        className={classes.pauseButton}
	        startIcon={<PauseIcon />}
	        disabled
	      >
	        Disable
	      </Button>
        <Button
	        className={classes.deleteButton}
	        startIcon={<DeleteIcon />}
	      >
	        Delete
	      </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
	);
}
