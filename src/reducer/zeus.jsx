import {handleActions} from 'redux-actions';

export const zeus = handleActions({
	REQUEST_ZEUS: (state, action) => ({
		...state,
		isFetching: true
	}),
	RECEIVE_ZEUS: (state, action) => ({
		...state,
		isFetching: false,
		data: action.payload
	})
}, {
	isFetching: false,
	data: []
});
console.log("引reducer-zeus渲染",'/src/redicer/zeus.jsx',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());