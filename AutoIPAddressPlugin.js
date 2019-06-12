const os = require('os');

const NAME = 'my-auto-ip-address-replace';

class AutoIPAddressPlugin {
  constructor(options) {
    this.name = options.name || "__SERVER_IP__";
    this.requested_interfaces = options.interfaces || ['en0'];

    this.getIPAddress();
  }

  getIPAddress() {
    const system_interfaces = os.networkInterfaces();

    for (let ri of this.requested_interfaces) {
      try {
        this.ip = system_interfaces[ri].filter(type => type.family === 'IPv4')[0].address;
        return;
      } catch (e) {

      }
    }

    throw new Error("any requested interfaces not found");
  };

  apply(compiler) {
    const name = this.name;
    const ip = this.ip;

    function onOptimize(modules) {
      modules.forEach(mod => {
        if (mod._source) {
          mod._source._value = mod._source._value.replace(name, `"${ip}"`);
        }
      });
    }

    if (compiler.hooks !== void 0) {
      compiler.hooks.compilation.tap(NAME, bundle => {
        bundle.hooks.optimizeModules.tap(NAME, onOptimize);
      });
    } else {
      compiler.plugin('compilation', bundle => {
        bundle.plugin('optimize-modules', onOptimize);
      });
    }
  }
}

module.exports = AutoIPAddressPlugin;