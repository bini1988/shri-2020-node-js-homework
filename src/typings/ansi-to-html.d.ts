declare namespace AnsiToHtml {
  interface Settings {
    fg?: string;
    bg?: string;
    newline?: false,
    escapeXML?: false,
    stream?: false
  }
  class Convert {
    public constructor(settings: AnsiToHtml.Settings)
    public toHtml(input: string | string[]): string
  }
}

declare module "ansi-to-html" {
  export = AnsiToHtml.Convert;
}
