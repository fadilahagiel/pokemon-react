import { act } from "react-dom/test-utils";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {pokemons: [], pokemon: {}}

function rootReducer(state=initialState, action) {
 switch (action.type) {
    case 'POKEMON/FETCHSUCCESS':
        return {
            ...state,
            pokemons: action.payload
        };
    case 'POKEMON/FETCHONESUCCESS':
        return {
            ...state,
            pokemon: action.payload
        };
    default:
        return state;
 }   
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store