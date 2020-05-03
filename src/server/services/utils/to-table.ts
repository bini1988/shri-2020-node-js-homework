
export default function toTable<T extends { id: string }>(array: Array<T>) {
  return array.reduce<[IDictionary<T>, Array<string>]>((out, item) => {
    out[0][item.id] = item;
    out[1].push(item.id);
    return out;
  }, [{}, []]);
}
