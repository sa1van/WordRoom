import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory, useLocation } from "react-router-dom";

function DialogDelete(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCategory = () => {
    props.deleteCategory(props.categoryname);
    setOpen(false);
    history.push("/profile");
  };

  return (
    <div>
      <div style={{ position: "absolute", left: "95%" }}>
        <IconButton aria-label="delete">
          <Tooltip title="Delete Category">
            <DeleteIcon
              fontSize="large"
              onClick={handleClickOpen}
              color="secondary"
            />
          </Tooltip>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete '{props.categoryname}' category
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting the category will delete all the words present in the
              category
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Disagree
            </Button>
            <Button onClick={handleDeleteCategory} color="secondary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default DialogDelete;
