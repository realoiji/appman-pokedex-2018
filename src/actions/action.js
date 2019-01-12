import * as ActionTypes from './actionTypes';
import { fetchApi } from '../utils/index';

const getPokemonLists = () => {
  return async (dispatch) => {
    const url = 'http://localhost:3030/api/cards';
    const data = await fetchApi('GET', url);
    await dispatch({
      type: ActionTypes.GET_CARDS,
      data: data.cards
    });
  };
};

export const addCardToMyDex = (data) => {
  return {
    type: ActionTypes.ADD_TO_MY_DEX,
    data
  };
};

export const removeCardFromMyDex = (data) => {
  return {
    type: ActionTypes.REMOVE_FROM_MY_DEX,
    data
  };
};

export const initApp = () => {
  return dispatch => [dispatch(getPokemonLists())];
};