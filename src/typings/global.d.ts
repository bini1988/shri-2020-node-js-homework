
interface IDictionary<TValue> {
  [id: string]: TValue;
}

interface Window {
  __INITIAL_STATE__: any
}

interface IPagination {
  limit?: number;
  offset?: number;
}

interface Query {
  [key: string]: string | Query | Array<string | Query>;
}
