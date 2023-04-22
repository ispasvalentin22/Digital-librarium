import { ARTICLES_SAVE } from "./article.types";

const INITIAL_STATE = {
  articles: []
}

const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTICLES_SAVE:
      return {
        ...state,
        articles: action.payload.articles
      };

    default:
      return state;
  }
};

export default articleReducer;