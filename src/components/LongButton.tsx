import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface LongButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
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

const LongButton = ({ buttonText, className, onClick }: LongButtonProps) => {
  const classes = useStyles();
  return <Button 
  onClick={onClick}
  className={className} 
  classes={{ root: classes.button, text: classes.buttonText }}>
    {buttonText}
  </Button>;
}

export default LongButton;