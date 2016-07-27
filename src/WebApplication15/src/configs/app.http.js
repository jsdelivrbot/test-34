export default function (config) {
   
    config.useStandardConfiguration()
					.withDefaults({
					    credentials: 'same-origin',
					    headers: { 
					        'Accept': 'application/json',
					        'X-Requested-With': 'Fetch'
					    }
					})
					.withInterceptor({
					    request(request) {
					        //console.log(`Requesting ${request.method} ${request.url}`);
					        return request;
					    },
					    response(response) {
					        return response; 
					    }
					});  
				  
}