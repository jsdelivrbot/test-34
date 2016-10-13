/* */ 
(function(process) {
  var eol = require('os').EOL,
      fs = require('fs'),
      pkg = require('../package.json!systemjs-json'),
      path = require('path'),
      defaultBinaryPath = path.join(__dirname, '..', 'vendor');
  function getHumanPlatform(platform) {
    switch (platform || process.platform) {
      case 'darwin':
        return 'OS X';
      case 'freebsd':
        return 'FreeBSD';
      case 'linux':
        return 'Linux';
      case 'win32':
        return 'Windows';
      default:
        return false;
    }
  }
  function getHumanArchitecture(arch) {
    switch (arch || process.arch) {
      case 'ia32':
        return '32-bit';
      case 'x86':
        return '32-bit';
      case 'x64':
        return '64-bit';
      default:
        return false;
    }
  }
  function getHumanNodeVersion(abi) {
    switch (parseInt(abi || process.versions.modules, 10)) {
      case 11:
        return 'Node 0.10.x';
      case 14:
        return 'Node 0.12.x';
      case 42:
        return 'io.js 1.x';
      case 43:
        return 'io.js 1.1.x';
      case 44:
        return 'io.js 2.x';
      case 45:
        return 'io.js 3.x';
      case 46:
        return 'Node.js 4.x';
      case 47:
        return 'Node.js 5.x';
      case 48:
        return 'Node.js 6.x';
      default:
        return false;
    }
  }
  function getHumanEnvironment(env) {
    var binding = env.replace(/_binding\.node$/, ''),
        parts = binding.split('-'),
        platform = getHumanPlatform(parts[0]),
        arch = getHumanArchitecture(parts[1]),
        runtime = getHumanNodeVersion(parts[2]);
    if (parts.length !== 3) {
      return 'Unknown environment (' + binding + ')';
    }
    if (!platform) {
      platform = 'Unsupported platform (' + parts[0] + ')';
    }
    if (!arch) {
      arch = 'Unsupported architecture (' + parts[1] + ')';
    }
    if (!runtime) {
      runtime = 'Unsupported runtime (' + parts[2] + ')';
    }
    return [platform, arch, 'with', runtime].join(' ');
  }
  function getInstalledBinaries() {
    return fs.readdirSync(defaultBinaryPath);
  }
  function isSupportedEnvironment(platform, arch, abi) {
    return (false !== getHumanPlatform(platform) && false !== getHumanArchitecture(arch) && false !== getHumanNodeVersion(abi));
  }
  function getArgument(name, args) {
    var flags = args || process.argv.slice(2),
        index = flags.lastIndexOf(name);
    if (index === -1 || index + 1 >= flags.length) {
      return null;
    }
    return flags[index + 1];
  }
  function getBinaryName() {
    var binaryName;
    if (getArgument('--sass-binary-name')) {
      binaryName = getArgument('--sass-binary-name');
    } else if (process.env.SASS_BINARY_NAME) {
      binaryName = process.env.SASS_BINARY_NAME;
    } else if (process.env.npm_config_sass_binary_name) {
      binaryName = process.env.npm_config_sass_binary_name;
    } else if (pkg.nodeSassConfig && pkg.nodeSassConfig.binaryName) {
      binaryName = pkg.nodeSassConfig.binaryName;
    } else {
      binaryName = [process.platform, '-', process.arch, '-', process.versions.modules].join('');
    }
    return [binaryName, 'binding.node'].join('_');
  }
  function getBinaryUrl() {
    var site = getArgument('--sass-binary-site') || process.env.SASS_BINARY_SITE || process.env.npm_config_sass_binary_site || (pkg.nodeSassConfig && pkg.nodeSassConfig.binarySite) || 'https://github.com/sass/node-sass/releases/download';
    return [site, 'v' + pkg.version, getBinaryName()].join('/');
  }
  function getBinaryPath() {
    var binaryPath;
    if (getArgument('--sass-binary-path')) {
      binaryPath = getArgument('--sass-binary-path');
    } else if (process.env.SASS_BINARY_PATH) {
      binaryPath = process.env.SASS_BINARY_PATH;
    } else if (process.env.npm_config_sass_binary_path) {
      binaryPath = process.env.npm_config_sass_binary_path;
    } else if (pkg.nodeSassConfig && pkg.nodeSassConfig.binaryPath) {
      binaryPath = pkg.nodeSassConfig.binaryPath;
    } else {
      binaryPath = path.join(defaultBinaryPath, getBinaryName().replace(/_/, '/'));
    }
    return binaryPath;
  }
  function hasBinary(binaryPath) {
    return fs.existsSync(binaryPath);
  }
  function getVersionInfo(binding) {
    return [['node-sass', pkg.version, '(Wrapper)', '[JavaScript]'].join('\t'), ['libsass  ', binding.libsassVersion(), '(Sass Compiler)', '[C/C++]'].join('\t')].join(eol);
  }
  module.exports.hasBinary = hasBinary;
  module.exports.getBinaryUrl = getBinaryUrl;
  module.exports.getBinaryName = getBinaryName;
  module.exports.getBinaryPath = getBinaryPath;
  module.exports.getVersionInfo = getVersionInfo;
  module.exports.getHumanEnvironment = getHumanEnvironment;
  module.exports.getInstalledBinaries = getInstalledBinaries;
  module.exports.isSupportedEnvironment = isSupportedEnvironment;
})(require('process'));
