import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography, Box, Grid, Menu, MenuItem, Select, FormControl,
  InputLabel, InputBase, withStyles, Button, Checkbox, ListItemText
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import EngagementCard from '../components/EngagementCard';

import {
  GET_ENGAGEMENTS,
  GetEngagementsVariables,
  GetEngagementsData,
  EngagementFields,
  SortSettings,
  FilterFields
} from '../gql/queries/GetEngagements';
import { appColors } from '../theme/globalTheme';
import { FilterList } from '@material-ui/icons';

const ENGAGEMENTS_PER_PAGE = 5;

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 15,
      position: 'relative',
      backgroundColor: appColors.white,
      border: 'none',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      '&:focus': {
        backgroundColor: appColors.white,
        borderRadius: 15,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const FilterInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: appColors.white,
      border: 'none',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      '&:focus': {
        backgroundColor: appColors.white,
        borderRadius: 4,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

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
      borderRadius: '20px 20px 0 0',
      paddingTop: 50,
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    filtersGrid: {
      width: '90vw',
      margin: 'auto'
    },
    sortForm: {
      backgroundColor: appColors.white,
      width: '35vw',
      borderRadius: '15px'
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
  const [sortFieldValue, setSortFieldValue] = useState<string>('latest');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterItem, setFilterItem] = useState<string>('');
  const [filterFieldValues, setFilterFieldValues] = useState<{ [key: string]: boolean }>({});
  const [isLoadExisting, setIsLoadExisting] = useState<boolean>(true);
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    sortField: 'createdOn', // Sort by event creation time
    order: -1, // Descending
    skip: 0,
    perPage: ENGAGEMENTS_PER_PAGE
  });
  const [filterFields, setFilterFields] = useState<FilterFields>({
    field: null,
    fieldValues: []
  })
  const [skipQuery, setSkipQuery] = useState<boolean>(true);

  useQuery<GetEngagementsData, GetEngagementsVariables>(
    GET_ENGAGEMENTS,
    {
      fetchPolicy: 'no-cache',
      variables: { sortSettings: sortSettings, filterFields: filterFields },
      skip: skipQuery,
      onCompleted: (data: any) => {
        console.log('data loaded', data);
        if (data.result.length === 0) {
          setIsLoadExisting(false);
        } else {
          const newSkip = sortSettings.skip + data.result.length;
          setSortSettings({ ...sortSettings, ['skip']: newSkip })
          setEngagements([...engagements].concat(data.result));
        }
        setSkipQuery(true);
      },
      onError: (err: any) => {
        console.log(err);
      }
    },
  );
  const loadData = () => {
    setSkipQuery(false);
  };

  // Initial load/query
  useEffect(loadData, []);

  const onDropdownSelect = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setSortFieldValue(value);
    if (value === 'latest') {
      setSortSettings({ ...sortSettings, ['sortField']: 'createdOn', ['order']: -1, ['skip']: 0 });
    } else if (value === 'earliest') {
      setSortSettings({ ...sortSettings, ['sortField']: 'createdOn', ['order']: 1, ['skip']: 0 });
    } else if (value === 'eventDateDesc') {
      setSortSettings({ ...sortSettings, ['sortField']: 'eventstartTime', ['order']: -1, ['skip']: 0 });
    } else if (value === 'eventDateAsc') {
      setSortSettings({ ...sortSettings, ['sortField']: 'eventStartTime', ['order']: 1, ['skip']: 0 });
    }
    setIsLoadExisting(true);
    setEngagements([]);
    loadData();
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onFilterSelect = (event: any) => {
    let value: keyof EngagementFields = event.target.value;
    setFilterItem(value);
    const filterValues: { [key: string]: boolean } = {};
    engagements.forEach(engagement => {
      const key: any = engagement[value];
      filterValues[key] = false;
    });
    setFilterFieldValues(filterValues);
  }

  const handleCheckboxChange = (event: any, key: string) => {
    event.preventDefault();
    filterFieldValues[key] = !filterFieldValues[key];
    setFilterFieldValues(filterFieldValues);
  }

  const classes = useStyles();

  return (
    <div>
      <Box className={isMobile ? classes.startTextContainerMobile : classes.startTextContainer}>
        <Typography variant={isMobile ? 'h4' : 'h3'} className={classes.startTitle}>Volunteering</Typography>
        <Typography
          style={{ color: '#5BCACE' }}
          variant={isMobile ? 'h4' : 'h3'}
          className={classes.startTitle}>made easy.</Typography>
        <Typography className={isMobile ? classes.startSubtextMobile : classes.startSubtext}>
          Voltch believes in promoting a more inclusive and supportive culture for all students  in NUS.
          Learn more about your peer by signing up for an enagement today.
        </Typography>
      </Box>
      <Box className={classes.engagementsGridContainer}>
        <Grid
          container
          direction="row"
          wrap="wrap"
          className={classes.filtersGrid}>
          <Grid item xs={6} style={{ display: 'flex' }}>
            <FormControl variant='outlined' className={`${classes.sortForm}`}>
              <Select
                id="volunteer-select"
                value={sortFieldValue}
                onChange={event => onDropdownSelect(event)}
                input={<BootstrapInput />}
              >
                <MenuItem value={'latest'}>Latest</MenuItem>
                <MenuItem value={'earliest'}>earliest</MenuItem>
                <MenuItem value={'eventDateDesc'}>latest event date</MenuItem>
                <MenuItem value={'eventDateAsc'}>earliest event date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button onClick={handleClick}><FilterList /> Filter</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem>
                <FormControl variant='outlined' className={`${classes.sortForm}`}>
                  <InputLabel htmlFor="filter-select">Select</InputLabel>
                  <Select
                    id="filter-select"
                    value={filterItem}
                    onChange={event => onFilterSelect(event)}
                    input={<FilterInput />}
                  >
                    <MenuItem value={'engagementType'}>Type</MenuItem>
                    <MenuItem value={'frequency'}>Frequency</MenuItem>
                    <MenuItem value={'skillsRequired'}>Skills</MenuItem>
                    <MenuItem value={'location'}>Location</MenuItem>
                  </Select>
                </FormControl>
                {
                  Object.entries(filterFieldValues).map(([key, val]: any[]) => (
                    <div key={key}>
                      <Checkbox
                        checked={val}
                        onChange={event => handleCheckboxChange(event, key)}
                      />
                      <ListItemText primary={key} />
                    </div>
                  ))
                }
              </MenuItem>
            </Menu> */}
          </Grid>
        </Grid>

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
            className={classes.engagementGrid}
          >
            {engagements.map((engagement, index) => {
              return <EngagementCard key={index} engagement={engagement} />;
            })}
          </Grid>
        </InfiniteScroll>
      </Box>
    </div>
  );
}

export default EngagementsDisplay;