import { getFirstItem } from "../utils";

const initialState = {};

/**
 * Убирает блюдо из корзины
 *
 * @param {Object} state
 * @param {Number} id
 * @returns
 */
function removePlateById(state, id) {
  if (typeof id === "number") {
    let newState = state;
    if (newState[id] != undefined) {
      if (newState[id].count != undefined) {
        newState[id].count -= 1;
      }
    }
    if (newState[id].count === 0) delete newState[id];
    return newState;
  }
}

/**
 * Обработчик dispatch'а в reducer cart
 *
 * @export
 * @param {Object} [state=initialState]
 * @param {Object} action
 * @returns
 */
export default function cart(state = initialState, action) {
  if (action.type === "MAKE_ORDER" || action.type === "CLEAR_CART") {
    return {};
  }

  /**
   * Добавление нового блюда
   */
  if (action.type === "ADD_PLATE") {
    const { id } = action.payload;
    // if (action.payload.restaurant)
    const firstItem = getFirstItem(state);
    if (firstItem != undefined) {
      if (firstItem.plate.restaurant != action.payload.restaurant) {
        let result = {};
        result[id] = {
          plate: action.payload,
          count: 1
        };
        return { ...result };
      }
    }
    let newState = state;
    if (state[id] === undefined) {
      newState[id] = {
        count: 1,
        plate: action.payload
      };
    } else {
      newState[id].count += 1;
    }
    return { ...newState };
  }
  if (
    action.type === "REMOVE_PLATE" ||
    action.type === "REMOVE_PLATE_BY_OBJECT"
  ) {
    const { id } = action.payload;
    return { ...removePlateById(state, id) };
  }
  return state;
}
