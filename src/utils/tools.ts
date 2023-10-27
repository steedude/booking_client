export function groupBy<T, U extends keyof T>(arr: T[], key: U) {
  return arr.reduce(
    (map, target) => {
      const name = target[key];

      if (typeof name !== 'string') return map;
      if (!map[name]) return { ...map, [name]: [target] };

      map[name].push(target);
      return map;
    },
    {} as Record<string, Array<T>>,
  );
}
