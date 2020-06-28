import {applyMiddleware,combineReducers, createStore, Store } from 'redux';
import {reducer} from '../reducers/reducer';
import {IAllRoundMatches} from '../types/types';
import thunk from 'redux-thunk'; 

/*
interface IReducer{
    reducer: IAllRoundMatches
}*/

const rootReducer = combineReducers({//<IReducer>
    reducer // {reducer} za u mapStateToProps
});

export default function configureStore(): Store<any, any> { //any ts type??
    const store = createStore(rootReducer, undefined,  applyMiddleware(thunk));
    return store;
}

