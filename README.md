# AutoIIPAddressReplacementPlugin

This plugin is the webpack plugin that replace constant to IP Address of specific network interfaces.

## usage

```javascript
const AutoIPAddressReplacementPlugin = require('./webpack-plugin/AutoIPAddressPlugin');

{
  // ...
  plugin: [
    new AutoIPAddressReplacementPlugin({
      name: "__SERVER_IP__",
      interfaces: ["en0", "lo0"] // BSD Device names
    })
  ]
}
```