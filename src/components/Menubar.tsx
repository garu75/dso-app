import React from 'react';
import { Menu, Close } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Popper,
  Paper,
  MenuList,
  Grow,
  ClickAwayListener,
  MenuItem,
  Button
} from '@material-ui/core';
import appTheme, { appColors } from '../theme/globalTheme';
import { NavLink, Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarStyle: {
      position: 'absolute',
      right: '5vw',
      fontSize: '20px',
      height: '40px',
      width: '40px'
    },
    linkText: {
      color: appColors.mediumRed,
      textDecoration: 'none'
    },
    loginButton: {
      fontSize: '20px',
      color: appColors.mediumRed,
      position: 'absolute',
      right: '5vw',
      textDecoration: 'none'
    },
    titleText: {
      fontSize: '20px',
      fontWeight: 'bolder',
      color: appColors.mediumRed,
    },
    menu: {
      top: '-6vh !important',
      left: '-1.5vw !important'
    },
    menuItem: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'black',
      textDecoration: 'none',
      width: '100%'
    },
    logoutButton: {
      textTransform: 'none',
      width: '100%',
      padding: 0
    }
  }),
);

type MenubarInput = {
  isLoggedIn: boolean;
  name: string;
  profileImage: string;
  logout: any;
}

const Menubar = (props: MenubarInput) => {
  const { isLoggedIn, name, profileImage, logout } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event: any) => {
    event.preventDefault();
    logout();
    handleClose();
  }

  return (
    <AppBar color='primary'>
      <Toolbar>
        <IconButton edge="start" color="inherit"
          aria-label="menu" onClick={handleClick}>
          <Menu style={{ color: appColors.mediumRed }} />
        </IconButton>
        <Link to={'/'} className={classes.linkText}>
          <Typography variant="h6" className={classes.titleText}>voltch</Typography>
        </Link>
        {isLoggedIn ?
          <Avatar className={classes.avatarStyle} alt={name} src={profileImage}>
            {name && name.charAt(0).toUpperCase()}
          </Avatar> :
          <Link to={'/login'} className={`${classes.loginButton}`}>
            <Typography variant="h6">LOGIN</Typography>
          </Link>
        }
        <Popper
          id="full-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          transition
          disablePortal
          className={`${classes.menu}`}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow">
                    <MenuItem style={{ width: '100vw', justifyContent: 'space-between' }}>
                      <Typography variant="h6" className={classes.titleText}>
                        voltch
                      </Typography>
                      <IconButton edge="start" color="inherit"
                        aria-label="menu" onClick={handleClose}>
                        <Close style={{ color: appColors.mediumRed }} />
                      </IconButton>
                    </MenuItem>
                    {
                      isLoggedIn ?
                        <div>
                          <MenuItem>
                            <NavLink to={'/myengagements'}
                              activeStyle={{ color: appColors.mediumRed }}
                              className={classes.menuItem}>
                              My Engagements
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink to={'/bookmarked'}
                              activeStyle={{ color: appColors.mediumRed }}
                              className={classes.menuItem}>
                              Bookmarked
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink to={'/profile'}
                              activeStyle={{ color: appColors.mediumRed }}
                              className={classes.menuItem}>
                              Profile
                            </NavLink>
                          </MenuItem>
                        </div> :
                        <div>
                          <MenuItem>
                            <NavLink to={'/login'}
                              activeStyle={{ color: appColors.mediumRed }}
                              className={classes.menuItem}>
                              Login
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink to={'/register'}
                              activeStyle={{ color: appColors.mediumRed }}
                              className={classes.menuItem}>
                              Sign Up
                            </NavLink>
                          </MenuItem>
                        </div>
                    }
                    <MenuItem>
                      <NavLink to={'/faq'}
                        activeStyle={{ color: appColors.mediumRed }}
                        className={classes.menuItem}>
                        FAQs
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink to={'/trainingmaterials'}
                        activeStyle={{ color: appColors.mediumRed }}
                        className={classes.menuItem}>
                        Training Materials
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink to={'/contact'} className={classes.menuItem}>
                        Contact Us
                      </NavLink>
                    </MenuItem>
                    {
                      isLoggedIn &&
                      <Button
                        className={classes.logoutButton}
                        onClick={event => handleLogout(event)}>
                        <MenuItem className={classes.menuItem}>
                          Logout
                      </MenuItem>
                      </Button>
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
};

export default Menubar;