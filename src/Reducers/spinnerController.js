/**
 * Модуль кконтролирующий появление загрузочного спинера
 */
const initialState = {
  show: false
};

export default function spinerController(state = initialState, action) {
  if (action.type == "SHOW_SPINNER") {
    return {
      show: true
    };
  }
  if (action.type == "HIDE_SPINNER") {
    return {
      show: false
    };
  }
  return state;
}
