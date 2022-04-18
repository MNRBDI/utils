import axios from 'axios';

const logUrl = process.env.LOG_URL;

export class Logger {
  application: string;
  constructor(application: string) {
    this.application = application;
  }

  private console(fn: Function, level: string, message: string) {
    fn.call(null, level.toUpperCase(), ':', this.application, ':', message);
  }

  private log(level: 'emerge' | 'alert' | 'crit' | 'error' | 'warning' | 'notice' | 'info' | 'debug', message: string) {
    if (logUrl) {
      const url = `${logUrl}/${this.application}/${level}`;
      axios.post(url, { message });
    } else {
      const { info, debug, error } = console;
      switch (level) {
        case 'info':
          this.console(info, level, message);
          break;
        case 'debug':
          this.console(debug, level, message);
          break;
        case 'error':
          this.console(error, level, message);
          break;
      }
    }
  }

  info(message: string) {
    this.log('info', message);
  }

  debug(message: string) {
    this.log('debug', message);
  }

  error(message: string) {
    this.log('error', message);
  }
}
