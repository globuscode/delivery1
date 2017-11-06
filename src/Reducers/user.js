import { createStore } from 'redux';

const initialState = {
    user: {},
    auth: {}
};

export default function user(state = initialState, action) {
    if (action.type === 'AUTH') {
        return action.payload;
    }
    if (action.type === 'REGISTRATION_ERROR') {
        console.log(action.payload);
        state.auth = action.payload;
        return state;
    }
    return state;
}

