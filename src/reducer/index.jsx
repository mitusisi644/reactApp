import {combineReducers} from 'redux';
import {zeus} from './zeus.jsx';

export const rootReducer = combineReducers({zeus});
console.log("进入reducer渲染",'/src/redicer/index.jsx',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());