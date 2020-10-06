import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Grid, CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLazyQuery } from '@apollo/client';

import EngagementCard from '../components/EngagementCard';
import appTheme from '../theme/globalTheme';

import { GET_ASSIGNMENTS, GetAssignmentsVariables, GetAssignmentsData, EngagementFields } from '../gql/queries/GetAssignments';

// Start of test data
const data = [
  { key: 0, name: 'One' },
  { key: 1, title: 'Two' },
  { key: 2, title: 'Three' },
  { key: 3, title: 'Four' },
  { key: 4, title: 'Five' },
  { key: 5, title: 'Six' },
  { key: 6, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
  { key: 7, title: 'Seven' },
];

// End of test data
const ENGAGEMENTS_PER_PAGE = 5;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    startTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '16%',
      marginRight: '16%',
      marginTop: '8%',
      marginBottom: '8%',
      paddingRight: '36%',
    },
    startTitle: {
      fontWeight: 700,
    },
    startSubtext: {
      textAlign: 'left',
      marginTop: 40,
    },
    engagementsGridContainer: {
      backgroundColor: '#f3f3f7',
      paddingTop: 98,
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerContainer: {
      height: 264,
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '16%',
      width: '50%',
    },
    footerPartition: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginRight: '5%'
    },
    fadedText: {
      color: 'rgba(0,0,0,0.87)'
    },
    infiniteScroll: {
      display: 'flex',
      justifyContent: 'center',
      // position: 'absolute',
    },
    // infiniteScroll: {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   backgroundColor: '#f3f3f7',
    //   paddingTop: 98,
    //   paddingBottom: 32,
    //   flexDirection: 'row',
    // },
    engagementGrid: {
      display: 'flex',
      justifyContent: 'center',
    }
  }),
);

const EngagementsDisplay = () => {
  // const [engagements, setEngagements] = useState<{name: string, key: number}[]>([]);
  const [engagements, setEngagements] = useState<EngagementFields[]>([]);
  const [isLoadExisting, setIsLoadExisting] = useState<boolean>(true);
  const [lastEngagementId, setLastEngagementId] = useState<string>('');
  console.log(lastEngagementId);
  const [getAssignments, { }] = useLazyQuery<GetAssignmentsData, GetAssignmentsVariables>(
    GET_ASSIGNMENTS,
    {
      variables: { startId: lastEngagementId, perPage: ENGAGEMENTS_PER_PAGE },
      onCompleted: (data) => {
        console.log('data loaded', data);
        const lastEngagement = data.result[data.result.length - 1];
        if (!lastEngagement || lastEngagementId === lastEngagement._id) {
          setIsLoadExisting(false);
        } else {
          setLastEngagementId(lastEngagement._id);
        }
        setEngagements([...engagements].concat(data.result));
      }
    },
  );

  useEffect(getAssignments, []);
  
  const classes = useStyles();

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar color='primary'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            voltch
        </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.startTextContainer}>
        <Typography variant='h3' className={classes.startTitle}>Volunteer,</Typography>
        <Typography variant='h3' className={classes.startTitle}>one hour at a time</Typography>
        <Typography variant='body1' className={classes.startSubtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam in faucibus justo. Sed placerat justo eu turpis posuere ultricies.
          Curabitur at arcu ac mauris laoreet fermentum at ut leo.
          Curabitur blandit sapien quis eros rutrum vehicula.
        </Typography>
      </Box>

      {/* TODO: query from backend and display as actual infinite grid list */}
      <Box className={classes.engagementsGridContainer}>
        <InfiniteScroll
          next={getAssignments}
          dataLength={engagements.length}
          hasMore={isLoadExisting}
          loader={<p>LOADING</p>}
          className={classes.infiniteScroll}
          scrollThreshold={0.1}
        >
          <Grid
            container
            direction="row"
            wrap="wrap"
            xs={8}
            className={classes.engagementGrid}
          >
            {engagements.map(({ title }) => {
              return <EngagementCard name={title} />;
            })}
          </Grid>
        </InfiniteScroll>
      </Box>

      <Box className={classes.footerContainer}>
        <Box className={classes.footerPartition}>
          <Typography variant='h6'>voltch</Typography>
          <Typography className={classes.fadedText}>In collaboration with</Typography>
          <Typography className={classes.fadedText}><strong>NUS Disability Support Office</strong></Typography>
        </Box>
        <Box className={classes.footerPartition}>
          <Typography align='left' className={classes.fadedText}>National University of Singapore</Typography>
          <Typography align='left' className={classes.fadedText}>Yusof Ishak House, Level 3</Typography>
          <Typography align='left' className={classes.fadedText}>31 Lower Kent Ridge Road</Typography>
          <Typography align='left' className={classes.fadedText}>Singapore 119078</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default EngagementsDisplay