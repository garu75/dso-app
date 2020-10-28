import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Box, Grid, IconButton, Card, CardContent } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

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

// const trainingMaterialsCardList = (materials: [], classes: any) => {

//   if (materials.length === 0) {
//     return (
//       <Typography className={classes.emptyListText}>
//         There are currently no Engagements
//       </Typography>
//     );
//   }

//   return (
//     <Grid
//       container
//       direction="row"
//       wrap="wrap"
//       spacing={1}
//       className={classes.cardGridContainer}>
//       { materials.map((material, index) =>
//         <Grid item key={index}>
//           <Card className={classes.cardStyle} variant="outlined">
//             <CardContent style={{ padding: '8px 16px' }}>
//               <Grid
//                 container
//                 direction="row"
//                 wrap="wrap"
//                 spacing={1}>
//                 <Grid item xs={9}>
//                   <Typography className={classes.cardTitle} gutterBottom>
//                     {material.title}
//                   </Typography>
//                   <Box className={classes.detailFieldContainer}>
//                     <Typography className={classes.detailText}>
                      
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={3} style={{ display: 'flex' }}>
//                   <IconButton>
//                     <Link to={`/details/${material._id}`} style={{ color: '#5C6093' }}>
//                       <NavigateNext fontSize="large" />
//                     </Link>
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

const TrainingMaterialsDisplay = () => {
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

  const { savedEngagements } = data.getMyInfo;

  return (
    <Box className={classes.rootContainer}>
      <Typography variant={'h4'} className={classes.title}>Training Materials</Typography>
      <Box>
        <MyEngagementCardList engagements={savedEngagements} />
      </Box>
    </Box>
  );
}

export default TrainingMaterialsDisplay;