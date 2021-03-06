const escpos = require('escpos');
escpos.Win = require('./index.js');

const device = new escpos.Win(); // 调用顺序 USB LPT1 COM1

const options = { encoding: "GB18030" /* default */ }
// encoding is optional
const printer = new escpos.Printer(device, options);

device.open(function (error) {
    console.log(0, error,new Date());
    printer
        .hardware('init')
        // .font('a')
        // .align('ct')
        // .style('bu')
        // .size(1, 1)
        .text('The quick brown fox jumps over the lazy dog')
        .pureText('敏捷的棕色狐狸跳过懒狗')
        // 00122012140016
        // .qrcode('00122012140016', 'code39')
        // .table(["One", "Two", "Three"])
        // .tableCustom(
        //     [
        //         { text: "Left", align: "LEFT", width: 0.33, style: 'B' },
        //         { text: "Center", align: "CENTER", width: 0.33 },
        //         { text: "Right", align: "RIGHT", width: 0.33 }
        //     ],
        //     { encoding: 'cp857', size: [1, 1] } // Optional
        // )
        // .qrcode('ทดสอบ')
        .qrimage('00122012140016', { type: 'png', mode: 'dhdw',size:2 }, function (err) {
            this.cut();
            this.close(err=>{
                console.log(1, err, new Date());
            });
        })
});
