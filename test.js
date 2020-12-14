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
        .size(1, 1)
        .encode('utf8')
        .text('QR code example')
        // .qrcodeqs('http://agriex.market')
        .qrcode('ทดสอบ')
        // .barcode('123456789012', 'EAN13') // code length 12
        // .barcode('109876543210') // default type 'EAN13'
        // .barcode('7654321', 'EAN8') // The EAN parity bit is automatically added.
        .close();
});
