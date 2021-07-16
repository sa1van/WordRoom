import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, useLocation } from "react-router-dom";
import DialogDelete from "./DialogDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    maxHeight: 200,
    overflow: "auto",
    wordWrap: "break-word",
  },
  avatar: {
    backgroundColor: "#ce94f7",
    cursor: "pointer",
  },
}));

function CategoryWords(props) {
  const classes = useStyles();
  const history = useHistory();

  const [items, setItems] = useState([]);
  const { categoryname } = useParams();

  useEffect(() => {
    setItems(props.words.filter((item) => item.category === categoryname));
  }, [categoryname, props.words]);

  return (
    <div>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid
            item
            xs={12}
            sm={items.length < 4 ? 12 : 6}
            lg={items.length < 4 ? 12 : 4}
          >
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <Tooltip title="Edit" placement="bottom">
                      <EditIcon
                        onClick={() => history.push(`/edit/${item.word}/`)}
                      />
                    </Tooltip>
                  </Avatar>
                }
                action={
                  <>
                    <IconButton aria-label="settings">
                      <Tooltip title="Delete" placement="bottom">
                        <DeleteForeverIcon
                          onClick={() => props.deleteWord(item.word)}
                        />
                      </Tooltip>
                    </IconButton>
                  </>
                }
                title={
                  <div>
                    <Typography
                      variant="body1"
                      color="secondary"
                      style={{ maxWidth: 200 }}
                    >
                      {item.word}
                    </Typography>
                  </div>
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.meaning}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DialogDelete
        categoryname={categoryname}
        deleteCategory={props.deleteCategory}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.data.category,
    words: state.data.words,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWord: (payload) => dispatch({ type: "DELETE_WORD", word: payload }),
    deleteCategory: (payload) =>
      dispatch({ type: "DELETE_CATEGORY", payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWords);
