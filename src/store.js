import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from './reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(...middleware)
));
console.log("引rootReducer渲染",'/src/redicer/store.js',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());