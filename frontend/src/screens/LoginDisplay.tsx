import React, { useState } from 'react';
import MaskedInput, { maskArray } from 'react-text-mask';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Box,
  Grid,
  FormControl,
  InputAdornment,
  Input,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Lock, Email } from '@material-ui/icons';
import { useMutation } from '@apollo/client';

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

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskEmail = (props: TextMaskCustomProps) => {
  const { inputRef, ...other } = props;

  const customMask = (value: string) => {
    const user = value.split('@')[0];
    const masking: maskArray = ['@u.nus.edu'];
    for (let i = 0; i < user.length; i++) {

      masking.unshift(/[a-zA-Z0-9._+-]/);
    }
    return masking;
  }

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={(value) => customMask(value)}
    />
  );
}

const formFieldRender = (onChange: any, onShowPasswordToggle: any,
  value: any, classes: any) => {

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
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <Email />
          </Grid>
          <Grid item>
            <FormControl required className={`${classes.textField}`}>
              <InputLabel htmlFor="university-email">NUS Email</InputLabel>
              <Input
                value={value['email']}
                onChange={event => onChange(event, 'email')}
                name="textmaskemail"
                id="university-email"
                inputComponent={TextMaskEmail as any}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

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
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

type LoginProps = {
  setUserInfo: any;
  history: any;
}

const LoginDisplay = (props: LoginProps) => {
  const { setUserInfo, history } = props;
  const [value, setValue] = useState<LoginInput>({ email: "", password: "" });
  
  const [login] = useMutation<GetUserData, LoginInput>(LOGIN, {
    onCompleted: (data: any) => {
      document.cookie = 'signedin=true';
      history.replace({ pathname: '/' });
      setUserInfo({
        isLoggedIn: true,
        name: data.login.name,
        profileImage: data.login.profileImage
      });
    },
    onError: (err: any) => console.log(err)
  });

  const onChange = (event: any, key: keyof LoginInput) => {
    setValue({ ...value, [key]: event.target.value });
  };

  const onShowPasswordToggle = (key: keyof LoginInput) => {
    setValue({ ...value, [key]: !value[key] });
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    console.log('clicked');
    login({ variables: { email: value['email'], password: value['password'] } });
  }

  const classes = useStyles();

  return (
    <Box className={classes.registerContainer}>
      <form className={classes.root}>
        <Typography variant={'h4'} className={classes.title}>Sign In</Typography>
        <div>
          {formFieldRender(onChange, onShowPasswordToggle, value, classes)}
          <ColorButton
            color="primary"
            onClick={e => onFormSubmit(e)}>LOGIN</ColorButton>
        </div>
      </form>
    </Box>
  );
}

export default LoginDisplay;