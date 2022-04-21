import axios from 'axios';
import chalk from 'chalk';
import * as dayjs from 'dayjs';

type Levels = 'emerge' | 'alert' | 'crit' | 'error' | 'warning' | 'notice' | 'info' | 'debug';
const colors: Record<Levels, typeof chalk> = {
  error: chalk.red,
  info: chalk.blue,
  warning: chalk.yellow,
  notice: chalk.green,
  debug: chalk.magenta,
  emerge: chalk.cyan,
  crit: chalk.redBright,
  alert: chalk.blueBright,
};

export class Logger {
  logUrl: string | undefined;
  printOnly: boolean;
  application: string;
  constructor(application: string, printOnly = false) {
    if (!application) {
      throw new Error('Application name cannot be null');
    }

    this.printOnly = printOnly;
    this.logUrl = process.env.LOG_URL;
    this.application = application;
  }

  private logs(level: Levels, message: string) {
    if (!this.printOnly && this.logUrl) {
      const url = `${this.logUrl}/${this.application}/${level}`;
      axios.post(url, { message });
    } else {
      console.log(chalk.gray(dayjs().format('DD/MM/YYYY, hh:mm:dd:ss')), '[', colors[level](level), '] :', message);
    }
  }

  info(message: string) {
    this.logs('info', message);
  }

  debug(message: string) {
    this.logs('debug', message);
  }

  error(message: string) {
    this.logs('error', message);
  }

  warning(message: string) {
    this.logs('warning', message);
  }
}
