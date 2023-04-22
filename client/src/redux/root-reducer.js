import { combineReducers } from 'redux';
import articleReducer from './article/article.reducer';

export default combineReducers({
  articles: articleReducer
});