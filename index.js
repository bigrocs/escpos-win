'use strict';
const net = require('net');
const util = require('util');
const EventEmitter = require('events');
/**
 * Win Adapter
 * @param {[type]} address
 * @param {[type]} port
 */
function Win(type) {
    this.device = require('node-escpos-win');
    let reg = RegExp(/([A-Z]+)(\d+)/)
    if (!type) {
        type = "USB1" 
    }
    if (type.match(reg)) {
        const s = reg.exec(type)
        const name = s[1]
        let number = Number(s[2])
        let list = []
        switch (name) {
            case "LPT":
                list = this.device.GetDeviceList("LPT").list
                break;
            case "COM":
                list = this.device.GetDeviceList("COM").list
                break;
            default:
                let usb = this.device.GetDeviceList("USB").list
                usb.forEach(item => {
                    if (item.service === 'usbprint' || item.name === 'USB 打印支持') {
                        list.push(item)
                    }
                });
                break;
        }
        if (list.length > 0) {
            if (list.length < number) { //找不到使用最后面设备
                number = list.length
            }
            number = number ? number-1 : 0 // 设备实际编号-1
            this.address = list[number]
        }
    }
    if (!this.address){
        throw new Error('Can not find printer');
    }
    EventEmitter.call(this);
    return this;
};

util.inherits(Win, EventEmitter);

/**
 * connect to remote device
 * @praram {[type]} callback
 * @return
 */
Win.prototype.open = function (callback) {
    callback && callback();
};

/**
 * write data to printer
 * @param {[type]} data -- byte data
 * @return 
 */
Win.prototype.write = function (data, callback) {
    if (this.address) {
        const res = this.device.Print(this.address, data);
        if (!res.success) {
            callback && callback(res.err, this.device);
        }
    }else{
        callback && callback("address is empty");
    }
    return this;
};

/**
 * [close description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Win.prototype.close = function (callback) {
    if (this.address) {
        this.device.Disconnect(this.address);
        this.address = null;
        this.device = null;
    }
    this.emit('disconnect', this.device);
    callback && callback(null, this.device);
    return this;
}

module.exports = Win;