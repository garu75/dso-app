import React, { useState } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  InputAdornment,
  Input,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Lock, Email } from '@material-ui/icons';
import { useLazyQuery } from '@apollo/client';

import TextFormField, { TextFormInput } from '../components/TextFormField';
import { LOGIN, LoginInput, GetUserData } from '../gql/queries/Authentication';

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#EF7471',
    borderRadius: '60px',
    width: '32ch',
    '&:hover': {
      backgroundColor: '#f74e4a',
    },
  },
}))(Button);

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
    title: {
      fontWeight: 'bolder',
      color: '#5C6093',
      fontSize: '28px',
      marginLeft: '6vh',
      textAlign: 'left'
    },
    registerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '15vh',
      marginBottom: '8%',
    },
    registerGridContainer: {
      backgroundColor: 'white',
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
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
      textAlign: 'start'
    },
  }),
);

type EmptyFieldCheck = { [key: string]: boolean }

const formFieldRender = (onChange: any, onShowPasswordToggle: any, 
  value: any, emptyField: EmptyFieldCheck, classes: any) => {
  const emailFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Email',
    field: 'email',
    icon: () => { return (<Email />); },
    validate: (val: any) => !emptyField.email,
    errorMessage: 'Email cannot be empty',
    required: true
  }

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      xs={12}
      spacing={1}
      className={classes.registerGridContainer}
    >
      {/* Email Field */}
      <TextFormField {...emailFieldInput} />

      {/* Password Field */}
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <Lock />
          </Grid>
          <Grid item>
            <FormControl
              required
              error={emptyField.password}
              className={`${classes.textField}`}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={value['showPassword'] ? 'text' : 'password'}
                value={value['password']}
                onChange={event => onChange(event, 'password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={event => onShowPasswordToggle('showPassword')}
                      onMouseDown={event => event.preventDefault()}
                    >
                      {value['showPassword'] ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {
                  emptyField.password ?
                  'Password cannot be empty' : ''
                }
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const LoginDisplay = () => {
  const [submitForm, { loading, data }] = useLazyQuery<GetUserData, LoginInput>(LOGIN, {
    onCompleted: (data: any) => {
      console.log(data);
      document.cookie = 'signedin=true';
    },
    onError: (err: any) => console.log(err)
  });
  const [value, setValue] = useState<LoginInput>({ email: "", password: "" });
  const [emptyField, setEmptyField] = useState<EmptyFieldCheck>({
    email: false,
    password: false
  })

  const onChange = (event: any, key: keyof LoginInput) => {
    setValue({ ...value, [key]: event.target.value });
  };

  const onShowPasswordToggle = (key: keyof LoginInput) => {
    setValue({ ...value, [key]: !value[key] });
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    let validInput: boolean = true;
    const newEmptyField = {...emptyField}
    for (let [key, val] of Object.entries(value)) {
      if (val === "") {
        validInput = false;
        newEmptyField[key] = true;
      } else {
        newEmptyField[key] = false;
      }
    }
    setEmptyField({...newEmptyField});
    if (validInput) {
      submitForm({variables: { email: value['email'], password: value['password'] }});
    }
  }

  const classes = useStyles();

  return (
    <Box className={classes.registerContainer}>
      <form className={classes.root}>
        <Typography variant={'h4'} className={classes.title}>Sign In</Typography>
            <div>
              {formFieldRender(onChange, onShowPasswordToggle, value, emptyField, classes)}
              <ColorButton
                color="primary"
                onClick={e => onFormSubmit(e)}>LOGIN</ColorButton>
            </div>
      </form>
    </Box>
  );
}

export default LoginDisplay;