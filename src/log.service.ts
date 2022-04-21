import axios from 'axios';
import Log from 'loglevel';

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

  private console(fn: Function, message: string) {
    fn.call(null, this.application, ':', message);
  }

  private logs(
    level: 'emerge' | 'alert' | 'crit' | 'error' | 'warning' | 'notice' | 'info' | 'debug',
    message: string,
  ) {
    if (!this.printOnly && this.logUrl) {
      const url = `${this.logUrl}/${this.application}/${level}`;
      axios.post(url, { message });
    } else {
      const { info, debug, error, warn } = Log;
      switch (level) {
        case 'warning':
          this.console(warn, message);
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
