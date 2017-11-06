import { createStore } from 'redux';

const initialState = [];

export default function cart(state = initialState, action) {
    if (action.type === 'ADD_PLATE') {
        return [
            ...state,
            action.payload
        ]
    }
    if (action.type === 'REMOVE_PLATE') {
        state.splice(action.index, 1);
        return state;
    }
    return state;
}

