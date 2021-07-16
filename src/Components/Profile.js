import { Tooltip, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    position: "relative",
  },
}));

function Profile(props) {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const history = useHistory();
  const goToBottom = useRef();

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        Hello User!!
        <ExpandMoreIcon
          style={{ margin: 5 }}
          onClick={() =>
            goToBottom.current.scrollIntoView({ behavior: "smooth" })
          }
        />
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          id="outlined-basic"
          color="secondary"
          label="Search a Word"
          variant="outlined"
          fullWidth
        />
      </form>
      <>
        {props.words.map((item) => (
          <div>
            {item.word.includes(search) ? (
              <>
                <div
                  style={{
                    textAlign: "center",
                    width: 500,
                    wordBreak: "break-word",
                    margin: 10,
                  }}
                >
                  <div>
                    <Tooltip
                      title={"Category is " + item.category}
                      placement="right"
                    >
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          history.push(`/category/${item.category}`);
                        }}
                        color="textSecondary"
                      >
                        {item.word}
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </>
      <div ref={goToBottom}></div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    words: state.data.words,
  };
};

export default connect(mapStateToProps, null)(Profile);
