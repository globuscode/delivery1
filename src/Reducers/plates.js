const initialState = {};

export default function restaurants(state = initialState, action) {
  if (action.type === "SAVE_PLATES") {
    let newState = { ...state };
    for (let i = 0; i < action.payload.length; i++) {
      const { id } = action.payload[i];
      newState[id] = action.payload[i];
    }
    return newState;
  }

  if (action.type === "SAVE_PLATE") {
    let newState = { ...state };
    const { id } = action.payload;
    newState[id] = action.payload;
    return newState;
  }

  return state;
}
