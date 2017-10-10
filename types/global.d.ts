/** Global definitions for developement **/

// for style loader
declare module '*.css' {
    const styles: any;
    export = styles;
}

declare module '*.styl' {
    const styles: any;
    export = styles;
}

declare module '*.json' {
    const data: any;
    export = data;
}

declare module '*.jpg' {
    const url: string;
    export = url;
}

declare module '*.jpeg' {
    const url: string;
    export = url;
}

declare module '*.png' {
    const url: string;
    export = url;
}

declare module '*.gif' {
    const url: string;
    export = url;
}

declare module '*.svg' {
    const url: string;
    export = url;
}

declare module '*.eot' {
    const url: string;
    export = url;
}

declare module '*.ttf' {
    const url: string;
    export = url;
}

declare module '*.woff' {
    const url: string;
    export = url;
}

declare module '*.woff2' {
    const url: string;
    export = url;
}

// Global setInterval for web
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

// Global Webpack constant
declare const __DEV__: boolean;

// for redux devtools extension
declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?(): (args?: any) => any;
    __PRELOADEDSTATE__?: any;
}

declare module 'express-status-monitor' {
    const middlewares: () => (req: Express.Request, res: Express.Response, next: (err?: any) => void) => void;
    export = middlewares;
}

declare module 'express-hbs' {
    export const express4: (options?: any) => any;
}
