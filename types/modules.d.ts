declare module 'express-status-monitor' {
    const middlewares: () => (req: Express.Request, res: Express.Response, next: (err?: any) => void) => void;
    export = middlewares;
}

declare module 'express-hbs' {
    export const express4: (options?: any) => any;
}
