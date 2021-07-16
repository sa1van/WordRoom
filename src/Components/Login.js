import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  align: {
    position: "absolute",
    left: "50%",
    transform: `translate(${"-50%"}, ${"50%"})`,
  },
}));

function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.align}
        onClick={() => history.push("/profile")}
      >
        Lets Start
      </Button>
    </div>
  );
}

export default Login;
