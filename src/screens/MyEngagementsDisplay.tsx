import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Box, } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { appColors } from '../theme/globalTheme';
import { GetUserData, GET_MY_INFO } from '../gql/queries/UserQueries';
import MyEngagementCardList from '../components/MyEngagementCardList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      display: 'grid',
      background: appColors.ghostWhite,
      minHeight: '100%',
      height: 'fit-content',
      width: '100%',
      paddingBottom: '5vh'
    },
    title: {
      fontWeight: 'bolder',
      color: '#5C6093',
      fontSize: '28px',
      marginTop: '13vh',
      marginLeft: '5vw',
      textAlign: 'left'
    },
    subtitle: {
      fontSize: '16px',
      color: '#5C6093',
      textAlign: 'left',
      marginTop: '4vh',
      marginBottom: '2vh',
      marginLeft: '5vw'
    },
  }),
);

const MyEngagementsDisplay = () => {
  const { data } = useQuery<{ [key: string]: GetUserData }, null>(
    GET_MY_INFO,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data: any) => {
        console.log(data);
      },
      onError: (err: any) => console.log(err)
    }
  );

  const classes = useStyles();

  if (!data) { // Wait for data to load
    return <div />;
  }

  const { acceptedEngagements, completedEngagements } = data.getMyInfo;

  return (
    <Box className={classes.rootContainer}>
      <Typography variant={'h4'} className={classes.title}>My Engagements</Typography>
      <Box>
        <Typography className={classes.subtitle}>Upcoming</Typography>
        <MyEngagementCardList engagements={acceptedEngagements} />
        <Typography className={classes.subtitle}>Completed</Typography>
        <MyEngagementCardList engagements={completedEngagements} />
      </Box>
    </Box>
  );
}

export default MyEngagementsDisplay;