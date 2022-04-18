"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const axios_1 = require("axios");
const logUrl = process.env.LOG_URL;
class Logger {
    constructor(application) {
        this.application = application;
    }
    console(fn, message) {
        fn.call(null, this.application, ':', message);
    }
    log(level, message) {
        if (logUrl) {
            const url = `${logUrl}/${this.application}/${level}`;
            axios_1.default.post(url, { message });
        }
        else {
            const { info, debug, error } = console;
            switch (level) {
                case 'info':
                    this.console(info, message);
                    break;
                case 'debug':
                    this.console(debug, message);
                    break;
                case 'error':
                    this.console(error, message);
                    break;
            }
        }
    }
    info(message) {
        this.log('info', message);
    }
    debug(message) {
        this.log('debug', message);
    }
    error(message) {
        this.log('error', message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log.service.js.map