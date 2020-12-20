
## node-escpos 插件
## escpos-win 
### win构建重要  注意使用 vs2015
```
npm install --global --production windows-build-tools --vs2015
```
### windos
    - usb免驱动
    - 自动获取第一个usb打印机
### 安装测试
```
npm install escpos-win
npm test
```

```
yarn add escpos-win
yarn test
```
#### Win()
```javascript
const escpos = require('escpos');
escpos.Win = require('escpos-win');

const device = new escpos.Win(); // 默认USB
const device = new escpos.Win('COM1');
const device = new escpos.Win('LPT1');

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);
```
