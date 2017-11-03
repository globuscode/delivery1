import { createStore } from 'redux';

function cart(state = [], action) {
    if (action.type === 'ADD_PLATE') {
        console.log(action.payload);
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}

const store = createStore(cart);

store.subscribe(() => {
    console.log('Subscribe ', store.getState());
});

export default store;