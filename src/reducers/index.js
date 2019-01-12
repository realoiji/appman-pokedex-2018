import { combineReducers } from 'redux';
import cards from './cards';
import myDex from './myDex';

export default combineReducers({
  cards,
  myDex,
});
