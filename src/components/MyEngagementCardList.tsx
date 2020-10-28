import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Box, Grid, Card, CardContent, IconButton } from '@material-ui/core';
import { EventNote, NavigateNext, Schedule } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { getEventDate, getEventTime } from '../components/EventDateAndTime';
import { EngagementFields } from '../gql/queries/GetEngagements';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGridContainer: {
      justifyContent: 'center'
    },
    detailFieldContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: 12,
    },
    cardStyle: {
      width: '90vw',
      borderRadius: '20px'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: '2vh'
    },
    detailText: {
      fontSize: 14,
      textAlign: 'left',
      marginLeft: '4vw'
    },
    emptyListText: {
      color: 'rgba(0,0,0,0.6)',
      fontSize: '18px',
      margin: '5vh 0'
    }
  }),
);

type MyEngagementCardListProps = {
  engagements: EngagementFields[]
}

const MyEngagementCardList = ({ engagements }: MyEngagementCardListProps) => {

  const classes = useStyles();

  if (engagements.length === 0) {
    return (
      <Typography className={classes.emptyListText}>
        There are currently no Engagements
      </Typography>
    );
  }

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      spacing={1}
      className={classes.cardGridContainer}>
      { engagements.map((engagement, index) =>
        <Grid item key={index}>
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent style={{ padding: '8px 16px' }}>
              <Grid
                container
                direction="row"
                wrap="wrap"
                spacing={1}>
                <Grid item xs={9}>
                  <Typography className={classes.cardTitle} gutterBottom>
                    {engagement.title}
                  </Typography>
                  <Box className={classes.detailFieldContainer}>
                    <EventNote />
                    <Typography className={classes.detailText}>
                      {getEventDate(engagement.eventStartTime)}
                    </Typography>
                  </Box>
                  <Box className={classes.detailFieldContainer}>
                    <Schedule />
                    <Typography className={classes.detailText}>
                      {getEventTime(engagement.eventStartTime, engagement.eventEndTime)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex' }}>
                  <IconButton>
                    <Link to={`/details/${engagement._id}`} style={{ color: '#5C6093' }}>
                      <NavigateNext fontSize="large" />
                    </Link>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default MyEngagementCardList;