import * as ActionType from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CARDS:
      return action.data;
    default:
      return state;
  }
};
