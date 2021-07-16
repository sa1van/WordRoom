import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    width: `calc(100% - ${"180"}px)`,
    marginLeft: 180,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary,
  },
  inputRoot: {
    borderBottom: `0.5px solid #e0e0e0`,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}>
            <MenuBookIcon color="secondary" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome, To the WordRoom!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
