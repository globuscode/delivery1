const initialState = {
  restaurant: null
};

export default function lastViewed(state = initialState, action) {
  if (action.type == "SET_VIEWED_RESTAURANT") {
    return {
      ...state,
      restaurant: action.payload
    };
  }
  return state;
}
