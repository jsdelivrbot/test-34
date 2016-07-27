var configForDevelopment = {
    // The base url used for all authentication related requests, including provider.url below.
    // This appends to the httpClient/endpoint base url, it does not override it.
    baseUrl: '',
    // The header property used to contain the authToken in the header of API requests that require authentication
    authHeader: 'Authorization',
    // The token name used in the header of API requests that require authentication
    authTokenType: 'Bearer',
    // The the property from which to get the access token after a successful login or signup
    accessTokenProp: 'id_token',
    //This is the property from which to get the token
    accessTokenName: 'name-of-project',
    profileUrl: 'api/oauth/token', 
    signupRedirect: '/#/confirmationSent',
    httpInterceptor: true,
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/',
  
};

var configForProduction = {
   
    baseUrl: '',
    // The header property used to contain the authToken in the header of API requests that require authentication
    authHeader: 'Authorization',
    // The token name used in the header of API requests that require authentication
    authTokenType: 'Bearer',
    // The the property from which to get the access token after a successful login or signup
    accessTokenProp: 'id_token',
    //This is the property from which to get the token
    accessTokenName: 'name-of-project',
    profileUrl: 'api/oauth/token', 
    signupRedirect: '/#/confirmationSent',
    httpInterceptor: true,
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/',
    
};
var config ;
if (window.location.hostname==='localhost') {
    config = configForDevelopment;
}
else{
    config = configForProduction;
}

export default config;