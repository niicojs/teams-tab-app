import React, { useState } from 'react';
// import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  apptoolbar: {
    paddingLeft: 16,
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: 16,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Layout({ user, children }) {
  const classes = useStyles();
  // const [openMenu, setOpenMenu] = useState(null);
  // const closeMenu = () => setOpenMenu(null);
  // const onLogOut = () => window.location.replace('/signout');

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.apptoolbar}>
          <DashboardIcon />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            My Team App
          </Typography>
          {!user ? null : <Typography>{user.name}</Typography>}
          <IconButton
            edge="end"
            aria-label="options"
            aria-controls="user-menu"
            aria-haspopup="true"
            // onClick={(evt) => setOpenMenu(evt.currentTarget)}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Menu
        anchorEl={openMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="user-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(openMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={onLogOut}>Déconnexion</MenuItem>
      </Menu> */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
