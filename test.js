const escpos = require('escpos');
const path = require('path');
escpos.Win = require('./index.js');

const device = new escpos.Win(); // 调用顺序 USB LPT1 COM1

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);

    const tux = path.join(__dirname, 'tux.png');
    escpos.Image.load(tux, function (image) {

        device.open(function () {

            printer.hardware('init')
                .align('ct')
                .image(image, 's8')
                .then(() => {
                    printer.cut().close();
                });

            // OR non-async .raster(image, "mode") : printer.text("text").raster(image).cut().close();

        });

    });
