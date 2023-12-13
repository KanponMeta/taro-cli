
/**
 * Finds the key in a map that corresponds to a given value.
 *
 * @param {Map<any, string>} map - The map to search in.
 * @param {string} value - The value to search for.
 * @return {any} The key that corresponds to the given value, or null if no match is found.
 */
export function getKeyByValue(map: Map<any, string>, value: string) {
  for (const [key, val] of map.entries()) {
    if (val === value) {
      return key;
    }
  }
  return null; // 如果未找到匹配的值，则返回null或自定义的默认值
}
