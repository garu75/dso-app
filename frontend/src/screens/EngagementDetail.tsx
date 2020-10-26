import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Modal, Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import { DateTime } from 'luxon';
import { EventNote, Schedule, Room, Person, Update, List } from '@material-ui/icons';
import { useMediaQuery } from 'react-responsive';
import { useMutation, useQuery } from '@apollo/client';

import { appColors } from '../theme/globalTheme';
import Footer from '../components/Footer';
import LongButton from '../components/LongButton';
import { EngagementFields, GET_ENGAGEMENT } from '../gql/queries/GetEngagements';
import HeartButton from '../components/HeartButton';
import { ACCEPT_ENGAGEMENT, GetUserData } from '../gql/queries/UserQueries';

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
    statusText: {
      marginTop: 19,
      backgroundColor: '#5C6093',
      color: appColors.white,
      borderRadius: 16,
      width: '100%'
    },
    statusTextDesktop: {
      marginTop: 19,
      backgroundColor: '#5C6093',
      color: appColors.white,
      borderRadius: 16,
      width: '50%'
    },
    detailLeftPartitionDesktopWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%'
    },
    detailRightPartitionDesktopWrapper: {
      width: '50%',
      marginLeft: 94,
    },
    confirmationModal: {
      width: 'fit-content',
      height: 'fit-content',
      margin: 'auto'
    },
    modalBox: {
      height: 'fit-content',
      width: '85vw',
      backgroundColor: appColors.white,
      padding: '5vh 5vw',
      borderRadius: '20px',
      borderStyle: 'none'
    },
    modalDescriptionContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '5vh',
    },
    modalGridItem: {
      display: 'flex',
      justifyContent: 'center'
    },
    modalButton: {
      color: appColors.white,
      borderRadius: '5px',
      width: '30vw'
    }
  }),
);

const confirmationModal = (
  engagementId: string,
  showModal: boolean,
  setShowModal: any,
  isLoggedIn: boolean,
  acceptEngagement: any,
  classes: any
) => {
  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className={classes.confirmationModal}
      aria-labelledby="modal-form"
      aria-describedby="edit-note-form"
    >
      <Box className={classes.modalBox}>
        <Box className={classes.modalDescriptionContainer}>
          <Typography className={classes.detailText}>
            {isLoggedIn ? "Are you sure you want to accept?" : "Please Log In to continue"}
          </Typography>
        </Box>
        <Grid
          container
          direction="row"
          wrap="wrap"
          spacing={1}
        >
          {isLoggedIn ?
            <Grid item xs={6} className={classes.modalGridItem}>
              <Button
                onClick={handleClose}
                className={classes.modalButton}
                style={{ backgroundColor: '#ef7471' }}>
                No
            </Button>
            </Grid> :
            <Grid item xs={6} className={classes.modalGridItem}>
              <Link to={'/register'} style={{ textDecoration: 'none' }}>
                <Button className={classes.modalButton} style={{ backgroundColor: '#ef7471' }}>
                  Sign Up
        </Button>
              </Link>
            </Grid>
          }
          {isLoggedIn ?
            <Grid item xs={6} className={classes.modalGridItem}>
              <Button
                onClick={() => acceptEngagement({ variables: { engagementId: engagementId } })}
                className={classes.modalButton}
                style={{ backgroundColor: '#5C6093' }}>
                Yes
            </Button>
            </Grid> :
            <Grid item xs={6} className={classes.modalGridItem}>
              <Link to={'/login'} style={{ textDecoration: 'none' }}>
                <Button className={classes.modalButton} style={{ backgroundColor: '#5C6093' }}>
                  Sign In
            </Button>
              </Link>
            </Grid>
          }
        </Grid>
      </Box>
    </Modal>
  );
};

const EngagementDetail = ({ match, history, userInfo }: any) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isSmallPhone = useMediaQuery({ query: '(max-device-height: 800px)' });
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data } = useQuery<{ [key: string]: EngagementFields }, { [key: string]: string }>(
    GET_ENGAGEMENT,
    {
      variables: { _id: match.params.id },
      onError: (err: any) => {
        console.log(err);
      }
    },
  );

  const [acceptEngagement] = useMutation<GetUserData, { [key: string]: string }>(ACCEPT_ENGAGEMENT, {
    onCompleted: (data: any) => {
      console.log(data);
      //history.push('/myengagements');
    },
    onError: (err: any) => console.log(err)
  });

  const classes = useStyles();

  if (!data) { // Wait for data to load
    return <div />;
  }

  const { _id, title, description, location, frequency, engagementType,
    eventStartTime, eventEndTime, skillsRequired, isSaved, status } = data.result;

  const eventDate = eventStartTime ? DateTime.fromISO(eventStartTime).toFormat('dd MMM y') : "No Date Specified";

  const eventTime = eventStartTime ? DateTime.fromISO(eventStartTime).toLocaleString(DateTime.TIME_SIMPLE)
    + (eventEndTime ? " - " + DateTime.fromISO(eventEndTime).toLocaleString(DateTime.TIME_SIMPLE) : "")
    : "No time specified";

  const skillsString = skillsRequired.length !== 0 ? skillsRequired.join(", ") : "No Experience Required";

  let statusString = status;
  if (status !== "unassigned") {
    if (userInfo['acceptedEngagements'].find((el: any) => el._id === _id)) {
      statusString = "Accepted";
    }
  }

  return (
    <Box className={isMobile ?
      (isSmallPhone ? classes.rootContainerSmallMobile : classes.rootContainer)
      : classes.rootContainerDesktop}>
      <Box className={isMobile ? classes.headingContainer : classes.headingContainerDesktop}>
        <Typography className={isMobile ? classes.title : classes.titleDesktop}>{title}</Typography>
        <Box className={classes.iconButtonsContainer}>
          <ShareIcon fontSize='large' style={{ color: '#EF7471' }} />
          <HeartButton _id={_id} isSaved={isSaved} />
        </Box>
      </Box>
      { confirmationModal(_id, showModal, setShowModal, userInfo['isLoggedIn'], acceptEngagement, classes)}
      <Box className={isMobile ? classes.detailCard : classes.detailCardDesktop}>
        {isMobile ? (
          <div>
            <Box className={classes.detailDescriptionContainer}>
              <Typography className={classes.detailText}>{description}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <List className={classes.detailIcon} />
              <Typography className={classes.detailText}>{engagementType}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <EventNote className={classes.detailIcon} />
              <Typography className={classes.detailText}>{eventDate}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <Schedule className={classes.detailIcon} />
              <Typography className={classes.detailText}>{eventTime}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <Update className={classes.detailIcon} />
              <Typography className={classes.detailText}>{frequency}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <Room className={classes.detailIcon} />
              <Typography className={classes.detailText}>{location}</Typography>
            </Box>
            <Box className={classes.detailFieldContainer}>
              <Person className={classes.detailIcon} />
              <Typography className={classes.detailText}>{skillsString}</Typography>
            </Box>
            {
              statusString === "unassigned" ?
                <LongButton className={classes.button} buttonText='Apply' onClick={() => setShowModal(true)} /> :
                <Typography className={classes.statusText}>{statusString}</Typography>
            }
          </div>

        ) : (
            <div className={classes.detailCardInnerWrapperDesktop}>
              <Box className={classes.detailLeftPartitionDesktopWrapper}>
                <Box className={classes.detailDescriptionContainerDesktop}>
                  <Typography className={classes.detailTextDesktop}>{description}</Typography>
                </Box>
                { statusString === "unassigned" ?
                <LongButton className={classes.buttonDesktop} buttonText='Apply' onClick={() => setShowModal(true)} /> :
                <Typography className={classes.statusTextDesktop}>{statusString}</Typography>
                }
              </Box>
              <Box className={classes.detailRightPartitionDesktopWrapper}>
                <Box className={classes.detailFieldContainer}>
                  <List className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{engagementType}</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <EventNote className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{eventDate}</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <Schedule className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{eventTime}</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <Update className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{frequency}</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <Room className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{location}</Typography>
                </Box>
                <Box className={classes.detailFieldContainer}>
                  <Person className={classes.detailIcon} />
                  <Typography className={classes.detailTextDesktop}>{skillsString}</Typography>
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