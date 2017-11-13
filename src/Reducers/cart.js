import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';

const initialState = [];

export default function cart(state = initialState, action) {
    if (action.type === 'MAKE_ORDER') {
        AsyncStorage.getItem('ORDERS_HISTORY', (err, value) => {
            if (value != null) {
                var history = JSON.parse(value);
                history.push(state);
            }
            else {
                var history = [JSON.parse.value];
            }
            AsyncStorage.setItem('ORDERS_HISTORY', JSON.stringify(history), () => {});
        });
        return initialState;
    }

    if (action.type === 'ADD_PLATE') {
        var isNewPlate = true;
        var i = 0;
        while (isNewPlate && i < state.length) {
            let equalTitle = action.payload.title === state[i].plate.title;
            let equalRestaurant = action.payload.restourant === state[i].plate.restourant;
            isNewPlate = !(equalTitle && equalRestaurant);
            i++;
        }

        if (isNewPlate) {
            return [
                ...state,{
                    plate: action.payload,
                    count: 1
                }
            ];
        }
        else {
            state[i-1].count++;
            return state;
        }
    }
    if (action.type === 'REMOVE_PLATE') {
        if (state[action.index].count <= 1)
            state.splice(action.index, 1);
        else
            state[action.index].count--;
        return state;
    }
    return state;
}

