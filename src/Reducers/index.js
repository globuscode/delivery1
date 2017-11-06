import { combineReducers, createStore } from 'redux';

import cart    from './cart';
import user from './user';

combineReducers
const store = createStore(
    combineReducers({
        cart,
        user
    })
);

store.subscribe(() => {
});

export default store;