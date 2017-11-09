import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';

const initialState = {
};

export default function user(state = initialState, action) {
    if (action.type === 'AUTH') {
        AsyncStorage.setItem('lastToken', JSON.stringify(action.payload.data.token), ()=>{ console.log('Последний токен сохранен')        });
        return action.payload.data;
    }
    if (action.type === 'REGISTRATION_ERROR') {
        console.log(action.payload);
        state.auth = action.payload;
        return state;
    }
    return state;
}

