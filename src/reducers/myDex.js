import _ from 'lodash';

import * as ActionType from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MYDEX:
      return [];
    case ActionType.ADD_TO_MY_DEX:
      return [
        ...state,
        action.data,
      ];
    case ActionType.REMOVE_FROM_MY_DEX:
      return _.reject(state, { id: action.data })
    default:
      return state;
  }
};
