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
        if (!this.address) {
            const usb = this.device.GetDeviceList("USB")
            if (usb.number>0) {
                const printer = usb.list.find(item => item.service === 'usbprint' || item.name === 'USB 打印支持');
                if (printer) {
                    this.address = printer.path
                }
            }
        }
        if (!this.address) {
            const lpt = this.device.GetDeviceList("LPT")
            if (lpt.number > 0) {
                this.address = lpt.list[0].path
            }
        }
        if (!this.address) {
            const com = this.device.GetDeviceList("COM")
            if (com.number > 0) {
                this.address = com.list[0].path
            }
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
        callback && callback(res, this.device);
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