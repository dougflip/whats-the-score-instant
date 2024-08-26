/**
 * Sets the value at the given index in the array.
 */
export function setAt<T>(arr: T[], index: number, value: T): T[] {
  return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
}

/**
 * Maps the elements in the array that match the predicate function.
 */
export function mapBy<T>(
  xs: T[],
  predicateFn: (x: T) => boolean,
  mapFn: (x: T) => T,
): T[] {
  return xs.map((x) => (predicateFn(x) ? mapFn(x) : x));
}
