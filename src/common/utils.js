let promiseAjax = (url, data,_method) => {
	//异步接口
	return fetch(url, {
		//body: JSON.stringify(data), // must match 'Content-Type' header
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, same-origin, *omit
		headers: {
		  'user-agent': 'Mozilla/4.0 MDN Example',
		  'content-type': 'application/json'
		},
		method: _method ? _method : 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // *client, no-referrer
	});
	
}

export default {
	"promiseAjax": promiseAjax,
}