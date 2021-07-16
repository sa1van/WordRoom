import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from "@material-ui/icons/Person";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const selectColor = "#ce94f7";

const ListOne = [
  { text: "My Profile", icon: <PersonIcon />, link: "/profile" },
  { text: "Add a word", icon: <CreateIcon />, link: "/create" },
];

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    color: theme.palette.secondary.main,
    margin: "auto",
    cursor: "pointer",
  },
  active: {
    background: "#f4f4f4",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();
  let { url } = useRouteMatch();

  console.log(url);

  const [currentSelected, setCurrentSelected] = useState("");
  const [category, setCategory] = useState([]);

  const { categoryname } = useParams();

  useEffect(() => {
    if (categoryname) setCurrentSelected(categoryname);
  }, [categoryname]);

  useEffect(() => {
    if (url && !categoryname)
      setCurrentSelected(
        url === "/create" ? "/create" : url === "/profile" ? "/profile" : null
      );
  }, [url, categoryname]);

  useEffect(() => {
    if (props.category) setCategory(props.category);
  }, [props.category]);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.toolbar}>
            Menu
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {ListOne.map((item, index) => (
            <div
              onClick={() => {
                setCurrentSelected(item.link);
                history.push(item.link);
              }}
              key={item.text}
              style={{
                backgroundColor:
                  currentSelected === item.link ? selectColor : null,
              }}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </div>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Categories"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {category.map((item, index) => (
            <div
              onClick={() => {
                setCurrentSelected(item);
                history.push("/category/" + item);
              }}
              key={item}
              style={{
                backgroundColor: currentSelected === item ? selectColor : null,
                wordWrap: "break-word",
              }}
            >
              {item && (
                <>
                  <ListItem button style={{ textAlign: "center" }}>
                    <ListItemText primary={item} />
                  </ListItem>
                </>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.data.category,
    words: state.data.words,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
