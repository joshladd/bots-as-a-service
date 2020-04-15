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
		color: theme.palette.text.primary,
    flexGrow: 1,
		verticalAlign: 'baseline',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    justifyContent: "flex-end",
		marginRight: "1rem",
  },
  startButton: {
  	color: theme.palette.success.light,
  },
  pauseButton: {
  	color: theme.palette.primary.light,
  },
	deleteButton: {
  	color: theme.palette.error.dark,
  },
}));

export default function ViewBotsPanel(props){
	const classes = useStyles();
	const botName = props.payload.name;
	const isOnline = props.payload.status.online;

	const enabledStatusLabel = isOnline ? 'disabled' : 'active';

	const isPlayButtonDisabled = !isOnline;
	const isPauseButtonDisabled = !isPlayButtonDisabled;

	return (
		<ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={botName + "-header"}
      >
        <Typography className={classes.heading}>{botName}</Typography>
        <Typography className={classes.secondaryHeading}>{enabledStatusLabel}</Typography>
				<Divider orientation="vertical" flexItem />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
      	<Button className={classes.startButton} startIcon={<PlayArrowIcon />} disabled={isPlayButtonDisabled}>
	        Start
	      </Button>
	      <Button className={classes.pauseButton} startIcon={<PauseIcon />} disabled={isPauseButtonDisabled}>
	        Disable
	      </Button>
        <Button className={classes.deleteButton} startIcon={<DeleteIcon />}>
	        Delete
	      </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
	);
}
