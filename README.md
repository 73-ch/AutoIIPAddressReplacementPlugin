# IPAddressReplacementPlugin

This plugin is the webpack plugin that replace constant to IP Address of specific network interfaces.

## usage

```javascript
const IPAddressReplacementPlugin = require('./WebpackIPAddressReplacePlugin');

module.exports = {
  // ...
  plugin: [
    new IPAddressReplacementPlugin({
      name: "__SERVER_IP__",
      interfaces: ["en0", "lo0"] // BSD Device names
    })
  ]
}
```

# IPAddressGetter
This module is simple ip address getter.

## usage
```javascript
const getIPAddress = require('./IPAddressGetter');

const address = getIPAddress(["en8", "en9", "en7", "en0"]);

// if "en8", "en9" does not exist and "en7" have "192.168.0.82", then this function return "192.168.0.82". 
```