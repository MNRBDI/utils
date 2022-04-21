"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const axios_1 = require("axios");
const logger_1 = require("@ptkdev/logger");
class Logger {
    constructor(application, printOnly = false) {
        if (!application) {
            throw new Error('Application name cannot be null');
        }
        this.printOnly = printOnly;
        this.logUrl = process.env.LOG_URL;
        this.application = application;
        this.log = new logger_1.default();
    }
    console(fn, message) {
        fn.call(null, this.application, ':', message);
    }
    logs(level, message) {
        if (!this.printOnly && this.logUrl) {
            const url = `${this.logUrl}/${this.application}/${level}`;
            axios_1.default.post(url, { message });
        }
        else {
            const { info, debug, error, warning } = this.log;
            switch (level) {
                case 'warning':
                    this.console(warning, message);
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