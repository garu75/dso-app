import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Grid,
  SvgIcon,
  InputLabel,
  Button,
  Avatar,
} from '@material-ui/core';
import { School, Home, Email, Phone } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/client';

import { SvgImageList } from './SvgImageList';
import { GET_MY_INFO, GetUserData, UPLOAD_PROFILE_IMAGE } from '../gql/queries/Authentication';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 'bold',
      color: 'rgba(0,0,0, 0.87)',
      fontSize: '20px',
    },
    profileContainer: {
      backgroundColor: '#F3F3F7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '10vh',
      paddingBottom: '5vh',
    },
    infoGridContainer: {
      marginTop: '5vh',
      backgroundColor: 'white',
      borderRadius: '40px 40px 0 0',
      paddingTop: '3vh',
      paddingBottom: '4vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    fieldGridLabel: {
      fontSize: 16,
      fontWeight: 600,
      color: 'rgba(0, 0, 0, 0.65)'
    },
    fieldGridText: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.65)'
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
    avatarStyle: {
      fontSize: '40px',
      height: '80px',
      width: '80px'
    }
  }),
);

const UserProfileDisplay = () => {
  const [uploadImage, { data }] = useMutation<GetUserData, { profileImage: string }>
    (UPLOAD_PROFILE_IMAGE, {
      onCompleted: (data: any) => 
      setUserInfo({ ...userInfo, profileImage: data.uploadProfileImage.profileImage }),
      onError: (err: any) => console.log(err)
    });
  const [userInfo, setUserInfo] = useState<GetUserData>({
    name: '',
    phone: '',
    email: '',
    profileImage: '',
    skills: [],
    role: '',
    major: '',
    year: -1,
    experience: '',
    timetable: '',
    completedEngagements: [],
    acceptedEngagements: [],
    savedEngagements: []
  });

  useQuery<boolean, null>(
    GET_MY_INFO,
    {
      onCompleted: (data: any) => {
        console.log(data);
        setUserInfo(data.getMyInfo);
      }
    }
  );

  const handleUpload = (event: any) => {
    const files = event.target.files;
    if (files && files[0]) {
      let filereader = new FileReader();
      filereader.addEventListener("load", e => {
        let result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          result = '';
        }
        uploadImage({ variables: { profileImage: (result || '') } });
      });
      filereader.readAsDataURL(files[0]);
    }
  }

  const classes = useStyles();

  return (
    <Box className={classes.profileContainer}>
      <Avatar className={classes.avatarStyle} alt={userInfo['name']} src={userInfo['profileImage']}>
        {userInfo['name'] && userInfo['name'].charAt(0).toUpperCase()}
      </Avatar>
      <Button>
        <InputLabel htmlFor='profile-image-upload'>
          Upload
        </InputLabel>
      </Button>
      <input accept={'image/*'} id={'profile-image-upload'} type='file'
        style={{
          visibility: "hidden",
        }}
        onChange={e => handleUpload(e)} />
      <Typography variant={'h4'} className={classes.title}>{userInfo['name']}</Typography>
      <Grid
        container
        direction="row"
        wrap="wrap"
        xs={12}
        spacing={3}
        className={classes.infoGridContainer}>

        {/* Email Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={2}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <Email style={{ fontSize: 25, paddingTop: '1vh' }} />
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Email</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['email']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Phone Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={2}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <Phone style={{ fontSize: 25, paddingTop: '1vh' }} />
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Phone</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['phone']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Faculty & Major Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={2}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <Home style={{ fontSize: 25, paddingTop: '1vh' }} />
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Faculty &amp; Major</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['major']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Year Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={2}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <School style={{ fontSize: 25, paddingTop: '1vh' }} />
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Year</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['year']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Timetable Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <SvgIcon style={{ fontSize: 35, paddingTop: '1vh' }}>
                {SvgImageList.timetable()}
              </SvgIcon>
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Timetable</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['timetable']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Skills Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <SvgIcon style={{ fontSize: 35, paddingTop: '1vh' }}>
                {SvgImageList.skills()}
              </SvgIcon>
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Skills</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['skills'].join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Volunteering Experience Field */}
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='flex-start'>
            <Grid item xs={2} style={{ textAlign: 'end' }}>
              <SvgIcon style={{ fontSize: 35, paddingTop: '1vh' }}>
                {SvgImageList.experience()}
              </SvgIcon>
            </Grid>
            <Grid item xs={10} style={{ textAlign: 'start' }}>
              <Typography className={classes.fieldGridLabel} variant={'h6'}>Volunteering Experience</Typography>
              <Typography className={classes.fieldGridText} variant={'subtitle1'}>
                {userInfo['experience']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default UserProfileDisplay;