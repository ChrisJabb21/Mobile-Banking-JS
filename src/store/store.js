import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';
import profileReducer from '../reducers/profile';


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
 const store = createStore(
     combineReducers({
         auth: authReducer,
         errors: errorsReducer,
         profile: profileReducer
     }),
     composeEnhancers(applyMiddleware(thunk))
 );

export default store;