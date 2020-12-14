const escpos = require('escpos');
escpos.Win = require('./index.js');

const device = new escpos.Win(); // 调用顺序 USB LPT1 COM1

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);

device.open(function (error) {
    printer
        .hardware('init')
        .model('qsprinter')
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .encode('tis620')
        .text('The quick brown fox jumps over the lazy dog')
        .text('สวัสดีภาษาไทย')
        .close();
  // .text('敏捷的棕色狐狸跳过懒狗')
  // .barcode('1234567', 'EAN8')
  // .qrimage('https://github.com/song940/node-escpos', function(err){
  //   this.cut();
  //   this.close();
  // });
});
