import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import EngagementCard from '../components/EngagementCard';
import appTheme from '../theme/globalTheme';

import { GET_ASSIGNMENTS, GetAssignmentsVariables, GetAssignmentsData, EngagementFields } from '../gql/queries/GetAssignments';
import Footer from '../components/Footer';

const ENGAGEMENTS_PER_PAGE = 5;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    startTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '16%',
      marginRight: '16%',
      marginTop: '16%',
      marginBottom: '8%',
      paddingRight: '36%',
    },
    startTextContainerMobile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '8%',
      marginRight: '8%',
      marginTop: '20%',
      marginBottom: '8%',
      paddingTop: 56,
    },
    startTitle: {
      fontWeight: 700,
      textAlign: 'left',
    },
    startSubtext: {
      textAlign: 'left',
      marginTop: 40,
    },
    startSubtextMobile: {
      textAlign: 'left',
      marginTop: 20,
    },
    engagementsGridContainer: {
      backgroundColor: '#f3f3f7',
      paddingTop: 98,
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    infiniteScroll: {
      display: 'flex',
      justifyContent: 'center',
    },
    engagementGrid: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  }),
);

const EngagementsDisplay = () => {
  // Media queries
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const [engagements, setEngagements] = useState<EngagementFields[]>([]);
  const [isLoadExisting, setIsLoadExisting] = useState<boolean>(true);
  const [lastEngagementId, setLastEngagementId] = useState<string>('');
  const [skipQuery, setSkipQuery] = useState<boolean>(true);
  useQuery<GetAssignmentsData, GetAssignmentsVariables>(
    GET_ASSIGNMENTS,
    {
      variables: { startId: lastEngagementId, perPage: ENGAGEMENTS_PER_PAGE },
      skip: skipQuery,
      onCompleted: (data) => {
        console.log('data loaded', data);
        const lastEngagement = data.result[data.result.length - 1];
        if (!lastEngagement || lastEngagementId === lastEngagement._id) {
          setIsLoadExisting(false);
        } else {
          setLastEngagementId(lastEngagement._id);
          setEngagements([...engagements].concat(data.result));
        }
        setSkipQuery(true);
      }
    },
  );
  const loadData = () => {
    setSkipQuery(false);
  };

  // Initial load/query
  useEffect(loadData, []);

  const classes = useStyles();

  return (
    // <ThemeProvider theme={appTheme}>
    //   <AppBar color='primary'>
    //     <Toolbar>
    //       <IconButton edge="start" color="inherit" aria-label="menu">
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" >
    //         voltch
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    <div>
      <Box className={isMobile ? classes.startTextContainerMobile : classes.startTextContainer}>
        <Typography variant={isMobile ? 'h4' : 'h3'} className={classes.startTitle}>Volunteer,</Typography>
        <Typography variant={isMobile ? 'h4' : 'h3'} className={classes.startTitle}>one hour at a time</Typography>
        <Typography className={isMobile ? classes.startSubtextMobile : classes.startSubtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam in faucibus justo. Sed placerat justo eu turpis posuere ultricies.
          Curabitur at arcu ac mauris laoreet fermentum at ut leo.
          Curabitur blandit sapien quis eros rutrum vehicula.
        </Typography>
      </Box>

      <Box className={classes.engagementsGridContainer}>
        <InfiniteScroll
          next={loadData}
          dataLength={engagements.length}
          hasMore={isLoadExisting}
          loader={<div />}
          className={classes.infiniteScroll}
        >
          {/* TODO: The grid isnt properly formatted - loader is appearing in a weird position next to all 
          the other engagements instead of directly below */}
          {/* Triston: I have temporarily changed the loader into an empty div */}
          <Grid
            container
            direction="row"
            wrap="wrap"
            xs={isMobile ? 12 : 8}
            className={classes.engagementGrid}
          >
            {engagements.map(({ title, _id }) => {
              return <EngagementCard name={title} key={_id} />;
            })}
          </Grid>
        </InfiniteScroll>
      </Box>

      <Footer />
    </div>
    // </ThemeProvider>
  );
}

export default EngagementsDisplay