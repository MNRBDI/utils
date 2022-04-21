export declare class Logger {
    logUrl: string | undefined;
    printOnly: boolean;
    application: string;
    constructor(application: string, printOnly?: boolean);
    private console;
    private logs;
    info(message: string): void;
    debug(message: string): void;
    error(message: string): void;
    warning(message: string): void;
}
