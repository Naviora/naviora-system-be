import snakeCase from 'lodash/snakeCase'

export function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) return obj.map(keysToSnake)
  if (obj && typeof obj === 'object' && !(obj instanceof Date))
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [snakeCase(k), keysToSnake(v)]))
  return obj
}
