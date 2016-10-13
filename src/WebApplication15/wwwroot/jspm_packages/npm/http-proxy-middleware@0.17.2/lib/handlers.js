/* */ 
var _ = require('lodash');
var logger = require('./logger').getInstance();
module.exports = {
  init: init,
  getHandlers: getProxyEventHandlers
};
function init(proxy, opts) {
  var handlers = getProxyEventHandlers(opts);
  _.forIn(handlers, function(handler, eventName) {
    proxy.on(eventName, handlers[eventName]);
  });
  logger.debug('[HPM] Subscribed to http-proxy events: ', _.keys(handlers));
}
function getProxyEventHandlers(opts) {
  var proxyEvents = ['error', 'proxyReq', 'proxyReqWs', 'proxyRes', 'open', 'close'];
  var handlers = {};
  _.forEach(proxyEvents, function(event) {
    var eventName = _.camelCase('on ' + event);
    var fnHandler = _.get(opts, eventName);
    if (_.isFunction(fnHandler)) {
      handlers[event] = fnHandler;
    }
  });
  if (!_.isFunction(handlers.error)) {
    handlers.error = defaultErrorHandler;
  }
  if (!_.isFunction(handlers.close)) {
    handlers.close = logClose;
  }
  return handlers;
}
;
function defaultErrorHandler(err, req, res) {
  var host = (req.headers && req.headers.host);
  if (res.writeHead && !res.headersSent) {
    res.writeHead(500);
  }
  res.end('Error occured while trying to proxy to: ' + host + req.url);
}
function logClose(req, socket, head) {
  logger.info('[HPM] Client disconnected');
}
