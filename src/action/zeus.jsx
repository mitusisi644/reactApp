import {createAction} from 'redux-actions';
const requestZeus = createAction('REQUEST_ZEUS');
const receiveZeus = createAction('RECEIVE_ZEUS');


const fetchData = () => {
	return new Promise((resolve, reject) => {
		fetch('http://192.144.145.215:3000/api/Agency')
		.then((res)=>{
	        if(res.ok){
	            res.text().then((data)=>{
					resolve(JSON.parse(data));
	            })
	        }
	    })
	    .catch((res)=>{
	        console.log(50,res.status);
	    });
	});
};
export const getZeus = () => async dispatch => {
	dispatch(requestZeus());
	let zeus = await fetchData();
	dispatch(receiveZeus(zeus));
};
console.log("进入action渲染",'/src/action/zeus.jsx',(new Date()).getMinutes()+":"+(new Date()).getMilliseconds());