import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useAppState } from "../../features/db/db";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  appBar: {
    position: "fixed",
    top: 0,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: 50, // Adjust the height as needed
    marginRight: theme.spacing(-2),
  },
  buttons: {
    display: "flex",
    gap: theme.spacing(2),
  },
  list: {
    width: 250,
    padding: theme.spacing(2),
    backgroundColor: "#599052FF",
    height: "100%",
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
  listItemText: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
  },
  drawerTitle: {
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
  },
}));

const AppHeader = () => {
  const { logout } = useAppState();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    console.log("toggleDrawer", open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.drawerHeader}>
        <MenuIcon />
        <Typography variant="h6" className={classes.drawerTitle}>
          Menu
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/instructors"
          className={classes.listItem}
        >
          <ListItemText
            primary="Instructors"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/students"
          className={classes.listItem}
        >
          <ListItemText
            primary="Students"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/quiz"
          className={classes.listItem}
        >
          <ListItemText
            primary="Quiz"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>{" "}
        <ListItem
          button
          component={Link}
          to="/questionbank"
          className={classes.listItem}
        >
          <ListItemText
            primary="Question Bank"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          // to="/questionbank"
          className={classes.listItem}
        >
          <ListItemText
            primary="Logout"
            onClick={() => {
              logout();
            }}
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} sx={{ backgroundColor: "#599052FF" }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="/logo-no-background.png"
                alt="App Logo"
                className={classes.logoImage}
              />
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                className={classes.title}
                style={{ color: "black", fontWeight: "bold" }}
              >
                ImtihaanHub
              </Typography>
            </Link>
          </div>
          <div className={classes.buttons}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button style={{ color: "black", fontWeight: "bold" }}>
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button style={{ color: "black", fontWeight: "bold" }}>
                Register
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </div>
  );
};

export default AppHeader;
