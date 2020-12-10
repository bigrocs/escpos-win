
## escpos-win

#### Win()
```javascript
const escpos = require('escpos');
escpos.Win = require('escpos-win');

const device = new escpos.Win(); // 默认USB
const device = new escpos.Win('COM1');
// 下面暂不支持
// const device = new escpos.Win('LPT1');

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);
```
