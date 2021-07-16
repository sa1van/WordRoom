import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
}));

function Create(props) {
  const classes = useStyles();
  const history = useHistory();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("");

  const [wordError, setWordError] = useState(false);
  const [meaningError, setMeaningError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [wordPresentError, setWordPresentError] = useState(false);

  const { wordname } = useParams();

  useEffect(() => {
    if (props.edit === true) {
      if (props && props.words && wordname && props.edit) {
        let array = props.words.filter((item) => item.word === wordname);

        if (array[0]) {
          setWord(array[0].word);
          setCategory(array[0].category);
          setMeaning(array[0].meaning);
        }
      }
    }
  }, [
    props,
    props.edit,
    props.words,
    wordname,
    setWord,
    setCategory,
    setMeaning,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (word.trim().length === 0) setWordError(true);
    else setWordError(false);

    if (meaning.trim().length === 0) setMeaningError(true);
    else setMeaningError(false);

    if (category.trim().length === 0) setCategoryError(true);
    else setCategoryError(false);

    let wordPresent = props.words.filter((item) => item.word === word.trim());

    if (
      word.trim().includes(" ") ||
      category.trim().includes(" ") ||
      word.trim().length === 0 ||
      category.trim().length === 0 ||
      meaning.trim().length === 0
    ) {
      if (wordPresent.length === 0) {
        setWordPresentError(false);
      } else {
        if (word.trim().length > 0) setWordPresentError(true);
        else setWordPresentError(false);
      }
    } else {
      let obj = {
        word: word.trim(),
        meaning: meaning.trim(),
        category: category.trim(),
      };

      if (props.edit === true) {
        props.editWord(obj);
        setWordPresentError(false);
        setWordError(false);
        setMeaningError(false);
        setCategoryError(false);
        setWord("");
        setMeaning("");
        setCategory("");
        history.goBack();
      } else {
        if (wordPresent.length === 0) {
          props.addWord(obj);
          props.addCategory(category);
          setWordPresentError(false);
          setWordError(false);
          setMeaningError(false);
          setCategoryError(false);
          setWord("");
          setMeaning("");
          setCategory("");
        } else {
          if (word.trim().length > 0) setWordPresentError(true);
          else setWordPresentError(false);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      {props.edit && (
        <Typography variant="h6" color="textSecondary">
          Edit
        </Typography>
      )}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setCategory(e.target.value.toUpperCase())}
          label="Category"
          variant="outlined"
          color="secondary"
          value={category}
          required
          error={categoryError || (category && category.trim().includes(" "))}
          disabled={false}
          helperText={
            categoryError
              ? "Category can't be empty"
              : category && category.trim().includes(" ")
              ? "Category can't have empty spaces"
              : null
          }
        />
        <TextField
          className={classes.field}
          onChange={(e) => setWord(e.target.value.toUpperCase())}
          label="Word"
          variant="outlined"
          color="secondary"
          value={word}
          required
          disabled={props.edit}
          error={wordError || (word && word.trim().includes(" "))}
          helperText={
            wordError
              ? "Word can't be empty"
              : word && word.trim().includes(" ")
              ? "Word can't have spaces"
              : null
          }
        />
        <TextField
          className={classes.field}
          onChange={(e) => setMeaning(e.target.value.toUpperCase())}
          label="Meaning"
          variant="outlined"
          color="secondary"
          fullWidth
          value={meaning}
          required
          error={meaningError}
          helperText={meaningError ? "Meaning can't be empty" : null}
        />
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
      </form>
      {wordPresentError && !props.edit && (
        <Typography variant="body2" color="secondary">
          Word is already present
        </Typography>
      )}
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
    addWord: (payload) => dispatch({ type: "ADD_WORD", payload: payload }),
    addCategory: (category) =>
      dispatch({ type: "ADD_CATEGORY", category: category }),
    editWord: (payload) => dispatch({ type: "EDIT_WORD", payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
