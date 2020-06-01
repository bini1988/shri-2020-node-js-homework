declare namespace i18nextHttpMiddleware {
  class LanguageDetector {
    new (...args: any[]): any;

    public type: any;
  }
  function handle(...args: any[]): any;
}

declare module "i18next-http-middleware" {
  export = i18nextHttpMiddleware
}
