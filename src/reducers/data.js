const initialState = {
  category: [],
  words: [],
};

const data = (state = initialState, action) => {
  if (action.type === "ADD_WORD") {
    return { ...state, words: [...state.words, action.payload] };
  }

  if (action.type === "ADD_CATEGORY") {
    if (state.category.includes(action.category) === false) {
      let categoryArray = state.category.filter(
        (item) => item !== action.category
      );
      categoryArray.push(action.category);
      return { ...state, category: categoryArray };
    }
    return { ...state };
  }

  if (action.type === "DELETE_WORD") {
    let wordsArray = state.words.filter((item) => item.word !== action.word);
    return { ...state, words: wordsArray };
  }

  if (action.type === "EDIT_WORD") {
    let wordsArray = state.words.filter(
      (item) => item.word !== action.payload.word
    );
    wordsArray.push(action.payload);
    let categoryArray = state.category;
    if (categoryArray.includes(action.payload.category) === false) {
      categoryArray.push(action.payload.category);
      return { ...state, words: wordsArray, category: categoryArray };
    }
    else
    return { ...state, words: wordsArray, category: categoryArray };
  }

  if (action.type === "DELETE_CATEGORY") {
    let wordsArray = state.words.filter(
      (item) => item.category !== action.payload
    );
    let categoryArray = state.category.filter(
      (item) => item !== action.payload
    );
    return { words: wordsArray, category: categoryArray };
  }

  return state;
};

export default data;
