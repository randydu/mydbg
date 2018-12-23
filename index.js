'use strict'

const dbg = require('debug');

module.exports = (name)=>{
        return {
            trace: dbg(`${name}.trace`),
            info: dbg(`${name}.info`),
            warn: dbg(`${name}.warn`),
            err: dbg(`${name}.err`),
            fatal: dbg(`${name}.fatal`),
            throw_error(msg){
                this.err(msg);
                throw new Error(msg);
            },
        };
    }    