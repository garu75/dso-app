import React from 'react';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import LongButton from './LongButton';
import { EngagementFields } from '../gql/queries/GetEngagements';
import HeartButton from './HeartButton';
import { getEventDate, getEventSchedule, getEventTime } from '../components/EventDateAndTime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 20,
      fontWeight: 700,
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'justify'
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
    cardContainerMobile: {
      backgroundColor: '#fff',
      width: '80vw',
      height: 220,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 22,
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
  }),
);

interface EngagementCardProps {
  engagement: EngagementFields;
}

const EngagementCard = (props: EngagementCardProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const { _id, title, description, location, eventStartTime, eventEndTime, isSaved, frequency } = props.engagement;

  const eventDate = getEventSchedule(eventStartTime, frequency);
  const eventTime = getEventTime(eventStartTime, eventEndTime);

  const shortDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  const classes = useStyles();
  return (
    <Box className={isMobile ? classes.cardContainerMobile : classes.cardContainer}>
      <Box className={classes.topCardPartition}>
        <Box className={classes.titlingTextContainer}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.subtitle}>{shortDescription}</Typography>
        </Box>
        <HeartButton _id={_id} isSaved={isSaved} />
      </Box>
      <Box className={classes.detailsContainer}>
        <Box className={classes.detailFieldContainer}>
          <EventNoteIcon />
          <Typography className={classes.detailFieldText}>{eventDate}</Typography>
        </Box>
        <Box className={classes.detailFieldContainer}>
          <ScheduleIcon />
          <Typography className={classes.detailFieldText}>{eventTime}</Typography>
        </Box>
        <Box className={classes.detailFieldContainer}>
          <RoomIcon />
          <Typography className={classes.detailFieldText}>{location}</Typography>
        </Box>

      </Box>
      <Link style={{ width: '100%', textDecoration: "none" }} to={`/details/${_id}`}>
        <LongButton buttonText='Learn More' />
      </Link>
    </Box>
  );
}

export default EngagementCard;