const initialState = {
  plates: {},
  collections: {},
  restaurants: {}
};
/**
 *
 *
 * @export
 * @param {any} [state=initialState]
 * @param {any} action
 * @returns
 */
export default function favourite(state = initialState, action) {
  const { type } = action;
  if (type == "SET_FAV") {
    return {
      ...action.payload
    };
  }

  if (
    type == "DELETE_PLATE" ||
    type == "DELETE_RESTAURANT" ||
    type == "DELETE_COLLECTION"
  ) {
    const { id } = action.payload;
    if (type == "DELETE_PLATE") delete state.plates[id];
    else if (type == "DELETE_COLLECTION") delete state.collections[id];
    else delete state.restaurants[id];
    return {
      ...state
    };
  }

  if (
    type == "ADD_PLATE_TO_FAV" ||
    type == "ADD_RESTAURANT_TO_FAV" ||
    type == "ADD_COLLECTION_TO_FAV"
  ) {
    const { id } = action.payload;
    if (type == "ADD_PLATE_TO_FAV") state.plates[id] = action.payload;
    else if (type == "ADD_COLLECTION_TO_FAV")
      state.collections[id] = action.payload;
    else state.restaurants[id] = action.payload;
    return {
      ...state
    };
  }

  return state;
}
