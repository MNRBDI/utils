"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const axios_1 = require("axios");
const chalk_1 = require("chalk");
const dayjs = require("dayjs");
const colors = {
    error: chalk_1.default.red,
    info: chalk_1.default.blue,
    warning: chalk_1.default.yellow,
    notice: chalk_1.default.green,
    debug: chalk_1.default.magenta,
    emerge: chalk_1.default.cyan,
    crit: chalk_1.default.redBright,
    alert: chalk_1.default.blueBright,
};
class Logger {
    constructor(application, printOnly = false) {
        if (!application) {
            throw new Error('Application name cannot be null');
        }
        this.printOnly = printOnly;
        this.logUrl = process.env.LOG_URL;
        this.application = application;
    }
    logs(level, message) {
        if (!this.printOnly && this.logUrl) {
            const url = `${this.logUrl}/${this.application}/${level}`;
            axios_1.default.post(url, { message });
        }
        else {
            console.log(chalk_1.default.gray(dayjs().format('DD/MM/YYYY, hh:mm:dd:ss')), '[', colors[level](level), '] :', message);
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