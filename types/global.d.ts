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

// Global setInterval for web
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

// Global Webpack constant
declare const __DEV__: boolean;

// for redux devtools extension
declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?(): (args?: any) => any;
}
