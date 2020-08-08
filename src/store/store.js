import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authenticate';


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
 const store = createStore(
     combineReducers({
         authenticate: authReducer
     }),
     composeEnhancers(applyMiddleware(thunk))
 );

export default store;