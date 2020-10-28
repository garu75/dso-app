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
  SvgIcon,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  TextField
} from '@material-ui/core';
import {
  AccountCircle, Visibility, VisibilityOff,
  Lock, Email, Phone, Home, School
} from '@material-ui/icons';
import { useMutation } from '@apollo/client';

import { SvgImageList } from './SvgImageList';
import { REGISTER, UserInput, GetUserData } from '../gql/queries/UserQueries';

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
      // '& input:invalid': {
      //   color: 'red !important',
      //   borderColor: 'red !important',
      //   borderWidth: 2,
      // }
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

type RegistrationFormFields = {
  name: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  skills: { [key: string]: boolean; };
  major: string;
  year: string;
  experience: string;
  timetable: string;
  showPassword: boolean;
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskYear = (props: TextMaskCustomProps) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-5]/]}
    />
  );
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

const firstPageRender = (
  onChange: (event: any, key: keyof RegistrationFormFields) => void,
  onShowPasswordToggle: (key: keyof RegistrationFormFields) => void,
  value: RegistrationFormFields,
  classes: any
) => {

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      spacing={1}
      className={classes.registerGridContainer}
    >

      {/* Name Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField label={'Name'}
              required
              className={classes.textField}
              value={value['name']}
              onChange={event => onChange(event, 'name')} />
          </Grid>
        </Grid>
      </Grid>

      {/* Phone Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <Phone />
          </Grid>
          <Grid item>
            <TextField label={'Phone'}
              required
              className={classes.textField}
              value={value['phone']}
              type='number'
              onChange={event => onChange(event, 'phone')} />
          </Grid>
        </Grid>
      </Grid>

      {/* Email Field */}
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
                      onClick={() => onShowPasswordToggle('showPassword')}
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

const secondPageRender = (
  onChange: (event: any, key: keyof RegistrationFormFields) => void,
  handleCheckboxChange: (itemKey: string) => void,
  value: RegistrationFormFields,
  classes: any
) => {
  const skillsArray: string[] = [];
  Object.entries(value['skills']).forEach(([key, val]) => {
    if (val) { skillsArray.push(key); }
  });

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      spacing={1}
      className={classes.registerGridContainer}
    >

      {/* Gender Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
          <SvgIcon style={{ fontSize: 30 }}>
              {SvgImageList.gender()}
            </SvgIcon>
          </Grid>
          <Grid item>
            <FormControl
              required
              className={`${classes.textField}`}>
              <InputLabel htmlFor="gender-select">Gender</InputLabel>
              <Select
                id="gender-select"
                value={value['gender']}
                onChange={event => onChange(event, 'gender')}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Timetable Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <SvgIcon style={{ fontSize: 30 }}>
              {SvgImageList.timetable()}
            </SvgIcon>
          </Grid>
          <Grid item>
            <TextField label={'Timetable'}
              className={classes.textField}
              value={value['timetable']}
              onChange={event => onChange(event, 'timetable')} />
          </Grid>
        </Grid>
      </Grid>

      {/* Year Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <School />
          </Grid>
          <Grid item>
            <FormControl className={`${classes.textField}`}>
              <InputLabel htmlFor="university-year">Year (1 - 5)</InputLabel>
              <Input
                value={value['year']}
                onChange={event => onChange(event, 'year')}
                name="textmaskyear"
                id="university-year"
                inputComponent={TextMaskYear as any}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Faculty & Major Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <Home />
          </Grid>
          <Grid item>
            <TextField label={'Faculty & Major'}
              className={classes.textField}
              value={value['major']}
              onChange={event => onChange(event, 'major')} />
          </Grid>
        </Grid>
      </Grid>

      {/* Skills Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <SvgIcon style={{ fontSize: 30 }}>
              {SvgImageList.skills()}
            </SvgIcon>
          </Grid>
          <Grid item>
            <FormControl
              className={`${classes.textField}`}>
              <InputLabel htmlFor="multiple-skills-check">Skills</InputLabel>
              <Select
                id="multiple-skills-check"
                multiple
                value={skillsArray}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {Object.entries(value['skills']).map(([key, val]: any[]) => (
                  <MenuItem key={key} value={key}>
                    <Checkbox
                      checked={val}
                      onChange={event => handleCheckboxChange(key)}
                    />
                    <ListItemText primary={key} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Volunteer Experience Field */}
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <SvgIcon style={{ fontSize: 30 }}>
              {SvgImageList.experience()}
            </SvgIcon>
          </Grid>
          <Grid item>
            <FormControl className={`${classes.textField}`}>
              <InputLabel htmlFor="volunteer-select">Volunteering Experience</InputLabel>
              <Select
                id="volunteer-select"
                value={value['experience']}
                onChange={event => onChange(event, 'experience')}
              >
                <MenuItem value={'underOneYear'}>Less than 1 year</MenuItem>
                <MenuItem value={'oneYear'}>1 year</MenuItem>
                <MenuItem value={'twoYear'}>2 years</MenuItem>
                <MenuItem value={'threeYear'}>3 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
}

const RegistrationDisplay = (history: any) => {
  const [page, setPage] = useState<number>(1);
  const [submitForm, { data }] = useMutation<GetUserData, UserInput>(REGISTER, {
    onCompleted: (data: any) => {
      console.log(data);
      history.history.push({ pathname: '/login' });
    },
    onError: (err: any) => console.log(err)
  });
  const [value, setValue] = useState<RegistrationFormFields>({
    name: '', phone: '', email: '', password: '', gender: '',
    skills: {
      'First Aid': false,
      'People Skills': false,
      'Sign Language': false,
      'Social Work Knowledge': false
    },
    major: '', year: '', experience: '', timetable: '',
    showPassword: false
  });

  const onChange = (event: any, key: keyof RegistrationFormFields) => {
    setValue({ ...value, [key]: event.target.value });
  };

  const handleCheckboxChange = (itemKey: string) => {
    const skills = value.skills;
    skills[itemKey] = !skills[itemKey]
    setValue({ ...value, ['skills']: skills });
  }

  const onShowPasswordToggle = (key: keyof RegistrationFormFields) => {
    setValue({ ...value, [key]: !value[key] });
  };

  const onChangePage = (event: any) => {
    event.preventDefault();
    setPage(2);
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    const skillsArray: string[] = [];
    Object.entries(value['skills']).forEach(([key, val]) => {
      if (val) { skillsArray.push(key) }
    });
    const { name, phone, email, password, 
      gender, major, experience, timetable } = value;
    const userDetails: UserInput = {
      user: {
        name, phone, email, password,
        gender, major, experience, timetable,
        year: Number(value['year']),
        skills: skillsArray,
        role: 'volunteer'
      }
    }

    submitForm({ variables: { ...userDetails } });
    console.log(userDetails);
  }

  const classes = useStyles();

  return (
    <Box className={classes.registerContainer}>
      <div className={classes.root}>
        <Typography variant={'h4'} className={classes.title}>Sign Up</Typography>
        {
          page === 1 ?
            <form onSubmit={event => onChangePage(event)}>
              {firstPageRender(onChange, onShowPasswordToggle, value, classes)}
              <ColorButton type="submit" color="primary">CONTINUE</ColorButton>
            </form>
            : <form onSubmit={event => onFormSubmit(event)}>
              {secondPageRender(onChange, handleCheckboxChange, value, classes)}
              <ColorButton type="submit" color="primary">REGISTER</ColorButton>
            </form>
        }
      </div>
    </Box>
  );
}

export default RegistrationDisplay;