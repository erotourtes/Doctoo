/**
 * Remove duplicates from an array.
 *
 * @template T
 * @param {T[]} array - The input array from which duplicates should be removed.
 * @param {(item: T) => any} [keyFn=item => item] - An optional function to determine the "key" for each item to identify duplicates.
 * @returns {T[]} An array with unique items based on the provided key function.
 */
export function removeDuplicates<T>(array: T[], keyFn: (item: T) => any = item => item): T[] {
  const uniqueKeys = new Set();
  const uniqueItems: T[] = [];

  array.forEach(item => {
    const key = keyFn(item);
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}
