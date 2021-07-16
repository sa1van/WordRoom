import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Components/Navbar";
import Error from "./Components/Error";
import Create from "./Components/Create";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { useHistory, useLocation } from "react-router-dom";
import "./App.css";
import CategoryWords from "./Components/CategoryWords";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  sideAndMainContent: {
    display: "flex",
    marginTop: 90,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Navbar />
            <div className={classes.sideAndMainContent}>
              <Sidebar />
              <Profile />
            </div>
          </Route>
          <Route exact path="/create">
            <Navbar />
            <div className={classes.sideAndMainContent}>
              <Sidebar />
              <Create />
            </div>
          </Route>
          <Route exact path="/category/:categoryname">
            <Navbar />
            <div className={classes.sideAndMainContent}>
              <Sidebar />
              <CategoryWords />
            </div>
          </Route>
          <Route exact path="/edit/:wordname">
            <div className={classes.sideAndMainContent}>
              <Create edit={true} />
            </div>
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
