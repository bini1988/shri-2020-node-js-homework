declare namespace i18nextFsBackend {
  class FsBackend {
    new (...args: any[]): any;

    public type: any;
  }
}

declare module "i18next-fs-backend" {
  export default i18nextFsBackend.FsBackend
}
