"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const axios_1 = require("axios");
class Logger {
    constructor(application, printOnly = false) {
        if (!application) {
            throw new Error('Application name cannot be null');
        }
        this.printOnly = printOnly;
        this.logUrl = process.env.LOG_URL;
        this.application = application;
    }
    console(fn, level, message) {
        fn.call(null, `${new Date().toISOString()} [${level}]:`, message);
    }
    logs(level, message) {
        if (!this.printOnly && this.logUrl) {
            const url = `${this.logUrl}/${this.application}/${level}`;
            axios_1.default.post(url, { message });
        }
        else {
            const { info, debug, error, warn } = console;
            switch (level) {
                case 'warning':
                    this.console(warn, 'warning', message);
                case 'info':
                    this.console(info, 'info', message);
                    break;
                case 'debug':
                    this.console(debug, 'debug', message);
                    break;
                case 'error':
                    this.console(error, 'error', message);
                    break;
            }
        }
    }
    info(message) {
        this.logs('info', message);
    }
    debug(message) {
        this.logs('debug', message);
    }
    error(message) {
        this.logs('error', message);
    }
    warning(message) {
        this.logs('warning', message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log.service.js.map