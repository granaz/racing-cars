import { RcErrors, ResponseError } from '../responseBuilder/ResponseError.service'

/**
 * Check if given string is a UUID
 * @param uuid
 */
export const checkUuid = (uuid: string): boolean => {
  console.log(uuid)

  const result = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)

  if (!result) {
    throw new RcErrors(ResponseError.INVALID_UUID)
  }

  return result
}

/**
 * Convert object to camelCase
 * @param param
 */
export const keysToCamelCase = (param: unknown) => {
  const toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    })
  }

  if (param instanceof Date) {
    return param
  }

  if (param !== null && typeof param === 'object' && !Array.isArray(param)) {
    const r = {}

    for (const item in param) {
      r[toCamel(item)] = keysToCamelCase(param[item])
    }

    return r
  } else if (Array.isArray(param)) {
    return param.map(item => (keysToCamelCase(item)))
  }

  return param
}
