const initialState = [];

/**
 * Обработчик dispatch'а в reducer cart
 *
 * @export
 * @param {Object} [state=initialState]
 * @param {Object} action
 * @returns
 */
export default function cards(state = initialState, action) {
  if (action.type === "UPDATE_CARDS") {
    return action.payload;
  }
  return state;
}
