import React, { useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles, withStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
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
  SvgIcon,
  MenuItem,
  Select,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import {
  AccountCircle, Visibility, VisibilityOff,
  Lock, Email, Phone, Home, School
} from '@material-ui/icons';
import { useMutation, useQuery } from '@apollo/client';

import TextFormField, { TextFormInput } from '../components/TextFormField';
import appTheme from '../theme/globalTheme';
import { SvgImageList } from './SvgImageList';
import { REGISTER, UserInput, GetUserData } from '../gql/queries/Authentication';

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

// const handleCheckAuth = () => {
//   const { loading } = useQuery<GetUserData, UserInput>(
//     REGISTER,
//     {

//     }
//   )
// }

type RegistrationFormFields = {
  name: string | null;
  phone: string | null;
  email: string | null;
  password: string | null;
  gender: string | null;
  skills: { [key: string]: boolean; };
  major: string;
  year: number | null;
  experience: string;
  timetable: string;
  showPassword?: boolean;
}

const fieldValidation: { [key: string]: (val: any) => boolean; } = {
  name: (val: any) => val !== '',
  phone: (val: any) => val !== '' && !isNaN(val),
  email: (val: any) => val !== '',
  password: (val: any) => val !== '',
  gender: (val: any) => val !== '',
  major: (val: any) => true,
  year: (val: any) => val === null || (!isNaN(val) && (val >= 1 && val <= 4)),
  timetable: (val: any) => true,
}

const firstPageRender = (onChange: any, onShowPasswordToggle: any, value: any, classes: any) => {
  const nameFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Name',
    field: 'name',
    icon: () => { return (<AccountCircle />); },
    validate: fieldValidation.name,
    errorMessage: 'Field should not be empty',
    required: true
  }

  const phoneFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Phone',
    field: 'phone',
    icon: () => { return (<Phone />); },
    validate: fieldValidation.phone,
    errorMessage: 'Only digits are allowed',
    required: true
  }

  const emailFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Email',
    field: 'email',
    icon: () => { return (<Email />); },
    validate: fieldValidation.email,
    errorMessage: 'Email should be an NUS Email',
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
      {/* Name Field */}
      <TextFormField {...nameFieldInput} />

      {/* Phone Field */}
      <TextFormField {...phoneFieldInput} />

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
              error={!fieldValidation.password(value['password'])}
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
                  fieldValidation.password(value['password']) ?
                    '' : 'Password cannot be empty'
                }
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const secondPageRender = (onChange: any, handleCheckboxChange: any, value: any, classes: any) => {
  const facultyFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Faculty & Major',
    field: 'major',
    icon: () => { return (<Home />); },
    validate: fieldValidation.major,
    errorMessage: 'Error',
    required: false
  }

  const yearFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Year',
    field: 'year',
    icon: () => { return (<School />); },
    validate: fieldValidation.year,
    errorMessage: 'Year should be between 1 to 4',
    required: false
  }

  const timetableFieldInput: TextFormInput = {
    onChange,
    value,
    title: 'Timetable',
    field: 'timetable',
    icon: () => {
      return (
        <SvgIcon>
          {SvgImageList.timetable()}
        </SvgIcon>
      );
    },
    validate: fieldValidation.timetable,
    errorMessage: 'Timetable should be an NUSMods Link',
    required: false
  }
  const skillsArray: string[] = [];
  Object.entries(value['skills']).forEach(([key, val]) => {
    if (val) { skillsArray.push(key) };
  });

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      xs={12}
      spacing={1}
      className={classes.registerGridContainer}
    >

      {/* Gender Field */}
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <Home />
          </Grid>
          <Grid item>
            <FormControl
              required
              error={!fieldValidation.gender(value['gender'])}
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
              <FormHelperText>A gender must be chosen</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Faculty Field */}
      <TextFormField {...facultyFieldInput} />

      {/* Year Field */}
      <TextFormField {...yearFieldInput} />

      {/* Timetable Field */}
      <TextFormField {...timetableFieldInput} />

      {/* Skills Field */}
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <SvgIcon>
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
      <Grid item>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className={`${classes.margin} ${classes.formField}`}>
          <Grid item>
            <SvgIcon>
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

const RegistrationDisplay = () => {
  const [page, setPage] = useState<number>(1);
  const [submitForm, { data }] = useMutation<GetUserData, UserInput>(REGISTER, {
    onCompleted: (data: any) => console.log(data),
    onError: (err: any) => console.log(err)
  });
  const [value, setValue] = useState<RegistrationFormFields>({
    name: null,
    phone: null,
    email: null,
    password: null,
    gender: null,
    skills: {
      'First Aid': false,
      'People Skills': false,
      'Sign Language': false,
      'Social Work Knowledge': false
    },
    major: '',
    year: null,
    experience: '',
    timetable: '',
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
    const firstPageFields: (keyof RegistrationFormFields)[] = ['name', 'phone', 'email', 'password'];
    let validInput: boolean = true;
    const newValue: RegistrationFormFields = { ...value };
    for (let el of firstPageFields) {
      if (value[el] !== null) {
        if (!fieldValidation[el](value[el])) {
          validInput = false;
        }
      } else {
        newValue[el] = '' as never;
        validInput = false;
      }
    }
    setValue({ ...newValue });
    if (validInput) {
      setPage(2);
    }
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    const firstPageFields: (keyof RegistrationFormFields)[] = ['gender', 'major', 'year', 'timetable'];
    let validInput: boolean = true;
    const newValue: RegistrationFormFields = { ...value };
    for (let el of firstPageFields) {
      if (value[el] !== null) {
        if (!fieldValidation[el](value[el])) {
          validInput = false;
        }
      } else {
        newValue[el] = '' as never;
        validInput = false;
      }
    }
    if (validInput) {
      const skillsArray: string[] = [];
      Object.entries(value['skills']).forEach(([key, val]) => {
        if (val) { skillsArray.push(key) }
      });
      const userDetails: UserInput = {
        user: {
          name: value['name'] || '',
          phone: value['phone'] || '',
          email: value['email'] || '',
          password: value['password'] || '',
          gender: value['gender'] || '',
          major: value['major'],
          timetable: value['timetable'],
          experience: value['experience'],
          skills: skillsArray,
          role: 'volunteer'
        }
      }
      if (value['year']) { userDetails.user['year'] = Number(value['year']); }
      submitForm({variables: { ...userDetails }});
      console.log(userDetails);
    } else {
      setValue({ ...newValue });
    }
  }

  const classes = useStyles();

  return (
    <Box className={classes.registerContainer}>
      <form className={classes.root}>
        <Typography variant={'h4'} className={classes.title}>Sign Up</Typography>
        {
          page === 1 ?
            <div>
              {firstPageRender(onChange, onShowPasswordToggle, value, classes)}
              <ColorButton
                color="primary"
                onClick={e => onChangePage(e)}>CONTINUE</ColorButton>
            </div>
            : <div>
              {secondPageRender(onChange, handleCheckboxChange, value, classes)}
              <ColorButton
                color="primary"
                onClick={e => onFormSubmit(e)}>REGISTER</ColorButton>
            </div>
        }
      </form>
    </Box>
  );
}

export default RegistrationDisplay;