import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface LongButtonProps {
  buttonText: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: { //button root
      backgroundColor: '#ef7471',
      borderRadius: 16,
      width: '100%'
    },
    buttonText: {
      color: '#fff',
    }
  }),
);

const LongButton = ({ buttonText, className }: LongButtonProps) => {
  const classes = useStyles();
  return <Button className={className} classes={{ root: classes.button, text: classes.buttonText }}>{buttonText}</Button>;
}

export default LongButton;