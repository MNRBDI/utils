"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const axios_1 = require("axios");
const chalk = require("chalk");
const dayjs = require("dayjs");
const colors = {
    error: chalk.red,
    info: chalk.blue,
    warning: chalk.yellow,
    notice: chalk.green,
    debug: chalk.magenta,
    emerge: chalk.cyan,
    crit: chalk.redBright,
    alert: chalk.blueBright,
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
            console.log(chalk.gray(dayjs().format('YYYY-MM-DD hh:mm:ss')), '[' + colors[level](level) + '] :', message);
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