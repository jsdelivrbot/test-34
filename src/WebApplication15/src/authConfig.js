var baseConfig = {
    endpoint: 'auth',
    configureEndpoints: ['auth', 'api']
};

var configForDevelopment = {
  
    // The API endpoint used in profile requests (inc. `find/get` and `update`)
    profileUrl: '/auth/me',

    // The header property used to contain the authToken in the header of API requests that require authentication
    authHeader: 'Authorization',
    // The token name used in the header of API requests that require authentication
    authTokenType : 'Bearer',    
    accessTokenProp : 'id_token',
    signupRedirect: '/#/login',
    httpInterceptor: false,
    // The API serves its tokens with a key of id_token which differs from
    // aurelia-auth's standard.
    accessTokenName : 'id_token',
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/schedule',
    logoutRedirect: '#/login',
    loginUrl: '/auth/login',
    // The SPA route used when an unauthenticated user tries to access an SPA page that requires authentication
    loginRoute: '#/login',
    // Option to turn refresh tokens On/Off
    useRefreshToken: true,
    // The option to enable/disable the automatic refresh of Auth tokens using Refresh Tokens
    autoUpdateToken: true,
    // Oauth Client Id
clientId: false,
// The the property from which to get the refresh token after a successful token refresh
refreshTokenProp: 'refresh_token',
    // This is the property from which to get the token `{ "refreshTokenProp": { "refreshTokenName" : '...' } }`
refreshTokenName: 'token',
    // This allows the refresh token to be a further object deeper `{ "refreshTokenProp": { "refreshTokenRoot" : { "refreshTokenName" : '...' } } }`
refreshTokenRoot: false,
withCredentials: true,
    // Controls how the popup is shown for different devices (Options: 'browser' or 'mobile')
platform: 'browser',
    // Determines the `window` property name upon which aurelia-authentication data is stored (Default: `window.localStorage`)
storage: 'localStorage',
    // The key used for storing the authentication response locally
storageKey: 'aurelia_authentication'
};

var configForProduction = {
   
    // The API endpoint used in profile requests (inc. `find/get` and `update`)
    profileUrl: '/auth/me',

    // The header property used to contain the authToken in the header of API requests that require authentication
    authHeader: 'Authorization',
    // The token name used in the header of API requests that require authentication
    authTokenType : 'Bearer',    
    accessTokenProp : 'id_token',
    signupRedirect: '/#/login',
    httpInterceptor: false,
    // The API serves its tokens with a key of id_token which differs from
    // aurelia-auth's standard.
    accessTokenName : 'id_token',
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/schedule',
    logoutRedirect: '#/login',
    loginUrl: '/auth/login',
    // The SPA route used when an unauthenticated user tries to access an SPA page that requires authentication
    loginRoute: '#/login',
    // Option to turn refresh tokens On/Off
    useRefreshToken: true,
    // The option to enable/disable the automatic refresh of Auth tokens using Refresh Tokens
    autoUpdateToken: true,
    // Oauth Client Id
    clientId: false,
    // The the property from which to get the refresh token after a successful token refresh
    refreshTokenProp: 'refresh_token',
    // This is the property from which to get the token `{ "refreshTokenProp": { "refreshTokenName" : '...' } }`
    refreshTokenName: 'token',
    // This allows the refresh token to be a further object deeper `{ "refreshTokenProp": { "refreshTokenRoot" : { "refreshTokenName" : '...' } } }`
    refreshTokenRoot: false,
    withCredentials: true,
    // Controls how the popup is shown for different devices (Options: 'browser' or 'mobile')
    platform: 'browser',
    // Determines the `window` property name upon which aurelia-authentication data is stored (Default: `window.localStorage`)
    storage: 'localStorage',
    // The key used for storing the authentication response locally
    storageKey: 'aurelia_authentication'
};
var config;
if (window.location.hostname === 'localhost') {
    config = Object.assign({}, baseConfig, configForDevelopment);
}
else {
    config = Object.assign({}, baseConfig, configForProduction);
}

export default config;