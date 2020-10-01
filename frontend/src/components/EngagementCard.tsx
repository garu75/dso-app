import React from 'react';
import { Box, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 20,
    },
    subtitle: {
      fontSize: 14,
    },
    cardContainer: {
      backgroundColor: '#fff',
      width: 300,
      height: 220,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 22,
      marginLeft: 13,
      marginRight: 13,
      marginTop: 16,
      marginBottom: 16,
      borderRadius: 20,
    },
    topCardPartition: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    titlingTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    heartIcon: {
      color: '#d8d8d8',
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      height: '66%',
    },
    detailFieldContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    detailFieldText: {
      marginLeft: 17,
    },
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

const EngagementCard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.cardContainer}>
      <Box className={classes.topCardPartition}>
        <Box className={classes.titlingTextContainer}>
          <Typography className={classes.title}><strong>Visual Aid</strong></Typography>
          <Typography className={classes.subtitle}>Insert short description here</Typography>
        </Box>
        <FavoriteIcon className={classes.heartIcon} fontSize='large' />
      </Box>
      <Box className={classes.detailsContainer}>
        <Box className={classes.detailFieldContainer}>
          <EventNoteIcon />
          <Typography className={classes.detailFieldText}>03 Sep 2020</Typography>
        </Box>
        <Box className={classes.detailFieldContainer}>
          <ScheduleIcon />
          <Typography className={classes.detailFieldText}>5pm - 6pm</Typography>
        </Box>
        <Box className={classes.detailFieldContainer}>
          <RoomIcon />
          <Typography className={classes.detailFieldText}>Faculty of Science</Typography>
        </Box>

      </Box>
      <Button classes={{ root: classes.button, text: classes.buttonText}}>Learn More</Button>
    </Box>
  );
}

export default EngagementCard;