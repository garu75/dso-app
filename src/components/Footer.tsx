import React from 'react';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { appColors } from '../theme/globalTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerContainer: {
      height: 264,
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '10%',
      width: '50%',
    },
    footerContainerMobile: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '10%',
      marginTop: 26,
    },
    footerPartition: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginRight: '5%'
    },
    footerPartitionMobile: {
      marginRight: '5%',
      marginBottom: 12,
    },
    fadedText: {
      color: 'rgba(0,0,0,0.87)',
      textAlign: 'left',
      fontSize: 12,
    },
    footerLogo: {
      marginBottom: 0,
    },
    footerLogoMobile: {
      marginBottom: 16,
      textAlign: 'left',
    },
  }),
);

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const classes = useStyles();

  return (
    <Box className={isMobile ? classes.footerContainerMobile : classes.footerContainer}>
      <Box className={isMobile ? classes.footerPartitionMobile : classes.footerPartition}>
        <Typography variant='h6' style={{ color: appColors.mediumRed }}
        className={isMobile ? classes.footerLogoMobile : classes.footerLogo}
        >voltch</Typography>
        <Typography className={classes.fadedText}>In collaboration with</Typography>
        <Typography className={classes.fadedText}><strong>NUS Disability Support Office</strong></Typography>
      </Box>
      <Box className={isMobile ? classes.footerPartitionMobile : classes.footerPartition}>
        <Typography align='left' className={classes.fadedText}>National University of Singapore</Typography>
        <Typography align='left' className={classes.fadedText}>Yusof Ishak House, Level 3</Typography>
        <Typography align='left' className={classes.fadedText}>31 Lower Kent Ridge Road</Typography>
        <Typography align='left' className={classes.fadedText}>Singapore 119078</Typography>
      </Box>
    </Box>
  );
};

export default Footer;