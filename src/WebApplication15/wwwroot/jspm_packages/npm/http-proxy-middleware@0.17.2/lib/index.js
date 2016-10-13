/* */ 
var _ = require('lodash');
var httpProxy = require('http-proxy');
var configFactory = require('./config-factory');
var handlers = require('./handlers');
var contextMatcher = require('./context-matcher');
var PathRewriter = require('./path-rewriter');
var Router = require('./router');
var logger = require('./logger').getInstance();
var getArrow = require('./logger').getArrow;
module.exports = HttpProxyMiddleware;
function HttpProxyMiddleware(context, opts) {
  var wsUpgradeDebounced = _.debounce(handleUpgrade);
  var wsInitialized = false;
  var config = configFactory.createConfig(context, opts);
  var proxyOptions = config.options;
  var proxy = httpProxy.createProxyServer({});
  logger.info('[HPM] Proxy created:', config.context, ' -> ', proxyOptions.target);
  var pathRewriter = PathRewriter.create(proxyOptions.pathRewrite);
  handlers.init(proxy, proxyOptions);
  proxy.on('error', logError);
  middleware.upgrade = wsUpgradeDebounced;
  return middleware;
  function middleware(req, res, next) {
    if (shouldProxy(config.context, req)) {
      var activeProxyOptions = prepareProxyRequest(req);
      proxy.web(req, res, activeProxyOptions);
    } else {
      next();
    }
    if (proxyOptions.ws === true) {
      catchUpgradeRequest(req.connection.server);
    }
  }
  function catchUpgradeRequest(server) {
    if (!wsInitialized) {
      server.on('upgrade', wsUpgradeDebounced);
      wsInitialized = true;
    }
  }
  function handleUpgrade(req, socket, head) {
    wsInitialized = true;
    if (shouldProxy(config.context, req)) {
      var activeProxyOptions = prepareProxyRequest(req);
      proxy.ws(req, socket, head, activeProxyOptions);
      logger.info('[HPM] Upgrading to WebSocket');
    }
  }
  function shouldProxy(context, req) {
    var path = (req.originalUrl || req.url);
    return contextMatcher.match(context, path, req);
  }
  function prepareProxyRequest(req) {
    req.url = (req.originalUrl || req.url);
    var originalPath = req.url;
    var newProxyOptions = _.cloneDeep(proxyOptions);
    __applyRouter(req, newProxyOptions);
    __applyPathRewrite(req, pathRewriter);
    if (proxyOptions.logLevel === 'debug') {
      var arrow = getArrow(originalPath, req.url, proxyOptions.target, newProxyOptions.target);
      logger.debug('[HPM] %s %s %s %s', req.method, originalPath, arrow, newProxyOptions.target);
    }
    return newProxyOptions;
  }
  function __applyRouter(req, options) {
    var newTarget;
    if (options.router) {
      newTarget = Router.getTarget(req, options);
      if (newTarget) {
        logger.debug('[HPM] Router new target: %s -> "%s"', options.target, newTarget);
        options.target = newTarget;
      }
    }
  }
  function __applyPathRewrite(req, pathRewriter) {
    if (pathRewriter) {
      var path = pathRewriter(req.url, req);
      if (typeof path === 'string') {
        req.url = path;
      } else {
        logger.info('[HPM] pathRewrite: No rewritten path found. (%s)', req.url);
      }
    }
  }
  function logError(err, req, res) {
    var hostname = (req.headers && req.headers.host) || (req.hostname || req.host);
    var target = proxyOptions.target.host || proxyOptions.target;
    var errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors';
    logger.error('[HPM] Error occurred while trying to proxy request %s from %s to %s (%s) (%s)', req.url, hostname, target, err.code, errReference);
  }
}
;
