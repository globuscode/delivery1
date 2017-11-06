import { combineReducers, createStore } from 'redux';

import cart    from './cart';
import updater from './cart';

combineReducers
const store = createStore(
    combineReducers({
        cart,
        updater
    })
);

store.subscribe(() => {
});

export default store;