'use strict';
const net = require('net');
const util = require('util');
const EventEmitter = require('events');
/**
 * Win Adapter
 * @param {[type]} address
 * @param {[type]} port
 */
function Win(address) {
    this.device = require('node-escpos-win');
    if (address) {
        this.address = address;;
    }else{
        const usb = addon.GetUsbDeviceList();
        const printer = usb.list.find(item => item.service === 'usbprint' || item.name === 'USB 打印支持');
        this.address = printer.path
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
    const res = this.device.Print(this.address, data);
    callback && callback(res, this.device);
    return this;
};

/**
 * [close description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Win.prototype.close = function (callback) {
    if (this.device) {
        this.device.Disconnect(this.address);
        this.device = null;
    }
    this.emit('disconnect', this.device);
    callback && callback(null, this.device);
    return this;
}

module.exports = Win;