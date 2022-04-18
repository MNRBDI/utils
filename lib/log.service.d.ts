export declare class Logger {
    application: string;
    constructor(application: string);
    private console;
    private log;
    info(message: string): void;
    debug(message: string): void;
    error(message: string): void;
}
