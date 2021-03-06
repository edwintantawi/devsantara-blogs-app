import ACTION_TYPES from '../actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
