import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';

import { setCurrentUser } from '../src/state';
import useTeams from '../src/useTeams';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const { ready, context } = useTeams();
  const init = useRef<boolean>();

  // get user from teams (not auth! just upn info)
  if (!init.current && ready) {
    init.current = true;
    if (context) {
      const upn: string = context.userPrincipalName;
      let display = upn.substring(0, upn.indexOf('.'));
      display = display[0].toUpperCase() + display.substring(1);
      setCurrentUser({
        upn,
        display,
      });
    }
  }

  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const [step, setStep] = useState(1 + Math.round(Math.random() * 10));

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onPrevious = () => {
    setStep(step - 1);
    setChecked([0]);
  };

  const onNext = () => {
    setStep(step + 1);
    setChecked([0]);
  };

  return (
    <>
      <Typography variant="h4">Step {step}</Typography>
      <List className={classes.list}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button
          disabled={step === 1}
          onClick={onPrevious}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        <Button onClick={onNext} endIcon={<ArrowForwardIcon />}>
          Next
        </Button>
      </ButtonGroup>
    </>
  );
}
