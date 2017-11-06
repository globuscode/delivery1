import { createStore } from 'redux';

const initialState = [];

export default function cart(state = initialState, action) {
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
        console.log(state);
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

