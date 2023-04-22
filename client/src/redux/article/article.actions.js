import { ARTICLES_SAVE } from './article.types';

export const articlesSave = ({ articles }) => (dispatch) => {
  dispatch({
    type: ARTICLES_SAVE,
    payload: {
      articles: articles
    },
  });
};