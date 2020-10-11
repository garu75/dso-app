import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& label.Mui-focused': {
        color: 'rgba(0,0,0, 0.6)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#5C6093',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5C6093',
      },
      '& label.Mui-error': {
        color: 'red'
      },
    },
    margin: {
      marginLeft: '0.5ch',
      marginTop: '2ch'
    },
    formField: {
      width: '100%',
      backgroundColor: '#F3F3F7',
      borderRadius: '12px 12px 0 0',
      '&:hover:not(:focus)': {
        border: '1.5px solid black',
        boxShadow: '0px 3px rgba(0, 0, 0, 0.25)'
      }
    },
    textField: {
      color: 'rgba(0,0,0, 0.6)',
      width: '25ch',
    },
  }),
);

export type TextFormInput = {
  onChange: (event: any, field: string) => {};
  value: any;
  title: string;
  field: string;
  icon: () => JSX.Element;
  validate: (value: any) => boolean;
  errorMessage: string;
  required: boolean;
};

const TextFormField = (props: TextFormInput) => {
  const { onChange, value, field, title, icon, validate, errorMessage, required } = props;
  const classes = useStyles();

  return (
    <Grid item>
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        className={`${classes.margin} ${classes.formField}`}>
        <Grid item>
          {icon()}
        </Grid>
        <Grid item>
          <TextField id={field} label={title}
            required={required}
            className={classes.textField}
            error={!validate(value[field])}
            helperText={validate(value[field]) ? '' : errorMessage}
            onChange={event => onChange(event, field)} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TextFormField;