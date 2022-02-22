import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CashImage from '../../assets/img/cryto_apex.png';
import FantomLogo from '../../assets/img/fantom-logo-grey.png';
import Image from 'material-ui-image';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#999cab',
    'background-color': '#1f1f2b',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Poppins", sans-serif',
    // fontFamily: '"Amarante", cursive',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'capitalize',
    color: '#999cab',
    fontSize: '14px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#999cab',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} style={{display: 'flex', alignItems: 'center'}}>
              {/* <a className={ classes.brandLink } href="/">Apex Finance</a> */}
              <Image color="none" style={{ width: '40px',height: '40px', paddingTop: '0px' }} src={CashImage} />
              <Link to="/" style={{color:'#fff', fontSize: '20px',}} className={classes.brandLink}>
                APEX
              </Link>
              <Typography style={{ fontSize: '13px', marginRight: '50px', paddingLeft: '50px', alignItems: 'center', justifyContent: 'center' }}>Powered by
                <Image color="none" style={{ width: '80px',height: '20px', paddingTop: '0px' }} src={FantomLogo} />
              </Typography>
            </Typography>
            <Box mr={5}>
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/staking" className={classes.link}>
                Staking
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                Board Room
              </Link>
              <Link color="textPrimary" to="/bonds" className={classes.link}>
                Buy & Redeem Bonds
              </Link>
              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              <a href="https://apxfinance.snazzydocs.com/docs/1.0/getting-started/introduction" className={classes.link}>
                Docs
              </a>
            </Box>
            <AccountButton text="Connect Wallet" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Image color="none" style={{ width: '40px',height: '40px', paddingTop: '0px' }} src={CashImage} />
            <Link to="/" style={{color:'#fff', fontSize: '20px',}} className={classes.brandLink}>
              APEX
            </Link>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Staking" to="/staking" />
                <ListItemLink primary="Board Room" to="/boardroom" />
                <ListItemLink primary="Buy & Redeem Bonds" to="/bonds" />
                {/*<ListItemLink primary="SBS" to="/sbs" />*/}
                {/*<ListItemLink primary="Liquidity" to="/liquidity" />*/}
                {/*<ListItemLink primary="Regulations" to="/regulations" />*/}
                <ListItem button component="a" href="https://apxfinance.snazzydocs.com/docs/1.0/getting-started/introduction">
                  <ListItemText>Docs</ListItemText>
                </ListItem>

                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect Wallet" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
