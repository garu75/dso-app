import React from 'react';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/Person';
import { useMediaQuery } from 'react-responsive';

import { appColors } from '../theme/globalTheme';
import Footer from '../components/Footer';
import LongButton from '../components/LongButton';

const useStyles = makeStyles(() =>
  createStyles({
    rootContainer: {
      position: 'absolute',
      background: appColors.ghostWhite,
      height: '100%',
      width: '100%',
    },
    rootContainerSmallMobile: {
      position: 'absolute',
      background: appColors.ghostWhite,
      height: '120%',
      width: '100%',
    },
    rootContainerDesktop: {
      position: 'absolute',
      background: appColors.white,
      height: '100%',
      width: '100%',
    },
    headingContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '20%',
      marginLeft: '10%',
      marginRight: '8%',
    },
    headingContainerDesktop: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 200,
      marginLeft: '10%',
      marginRight: '10%',
    },
    iconButtonsContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 700,
      fontSize: 20,
    },
    titleDesktop: {
      fontWeight: 700,
      fontSize: 36,
    },
    heartIcon: {
      marginLeft: 18,
    },
    detailCard: {
      backgroundColor: appColors.white,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      marginTop: 32,
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    detailCardDesktop: {
      backgroundColor: appColors.ghostWhite,
      borderRadius: 32,
      marginTop: 32,
      marginLeft: '10%',
      marginRight: '10%',
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: '3%',
      paddingRight: '3%',
    },
    detailCardInnerWrapperDesktop: {
      display: 'flex',
      justifyContent: 'center',
    },
    detailText: {
      fontSize: 14,
      textAlign: 'left',
    },
    detailTextDesktop: {
      fontSize: 18,
      textAlign: 'left',
    },
    lineBreak: {
      lineHeight: 32,
    },
    detailFieldContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: 12,
    },
    detailDescriptionContainer: {
      marginBottom: 32,
    },
    detailDescriptionContainerDesktop: {
      marginBottom: 32,
      minHeight: 190,
    },
    detailIcon: {
      marginRight: 17,
    },
    button: {
      marginTop: 19,
    },
    buttonDesktop: {
      marginTop: 19,
      width: '50%',
    },
    detailLeftPartitionDesktopWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%'
    },
    detailRightPartitionDesktopWrapper: {
      width: '50%',
      marginLeft: 94,
    }
  }),
);

const EngagementDetail = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isSmallPhone = useMediaQuery({ query: '(max-device-height: 800px)' });

  const classes = useStyles();

  return (
    <Box className={isMobile ?
      (isSmallPhone ? classes.rootContainerSmallMobile : classes.rootContainer)
      : classes.rootContainerDesktop}>
      <Box className={isMobile ? classes.headingContainer : classes.headingContainerDesktop}>
        <Typography className={isMobile ? classes.title : classes.titleDesktop}>Visual Aid</Typography>
        <Box className={classes.iconButtonsContainer}>
          <ShareIcon fontSize='large' />
          <FavoriteIcon className={classes.heartIcon} fontSize='large' />
        </Box>
      </Box>
      <Box className={isMobile ? classes.detailCard : classes.detailCardDesktop}>
        {isMobile ? (
          <div>
            <Box className={classes.detailDescriptionContainer}>
              <Typography className={classes.detailText}>
                Lorem ipsum dolor sit amet, conseetur adipiscing elit. Pellentesque ut blandit odio, a tristique urna.
                <br className={classes.lineBreak} />
                Nunc eu elit a risus blandit rutrum. Vestulum sagittis augue non felis accumsan accumsan.
              </Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <EventNoteIcon className={classes.detailIcon} />
              <Typography className={classes.detailText}>03 Sep 2020</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <ScheduleIcon className={classes.detailIcon} />
              <Typography className={classes.detailText}>5pm - 6pm</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <RoomIcon className={classes.detailIcon} />
              <Typography className={classes.detailText}>Faculty of Science</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <PersonIcon className={classes.detailIcon} />
              <Typography className={classes.detailText}>No experience required</Typography>
            </Box>
            <LongButton className={classes.button} buttonText='Apply' />
          </div>

        ) : (
            <div className={classes.detailCardInnerWrapperDesktop}>
              <Box className={classes.detailLeftPartitionDesktopWrapper}>
                <Box className={classes.detailDescriptionContainerDesktop}>
                  <Typography className={classes.detailTextDesktop}>
                    Lorem ipsum dolor sit amet, conseetur adipiscing elit. Pellentesque ut blandit odio, a tristique urna.
                    <br className={classes.lineBreak} />
                    Nunc eu elit a risus blandit rutrum. Vestulum sagittis augue non felis accumsan accumsan.
                  </Typography>
                </Box>
                <LongButton className={classes.buttonDesktop} buttonText='Apply' />

              </Box>
              <Box className={classes.detailRightPartitionDesktopWrapper}>
                <Box className={classes.detailFieldContainer}>
                  <EventNoteIcon className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>03 Sep 2020</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <ScheduleIcon className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>5pm - 6pm</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <RoomIcon className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>Faculty of Science</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <PersonIcon className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>No experience required</Typography>
                </Box>
              </Box>
            </div>
          )}
      </Box>
      <Footer />
    </Box>
  );
}

export default EngagementDetail;