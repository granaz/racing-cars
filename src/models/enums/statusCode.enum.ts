/**
 * Define Status code
 */
export enum StatusCode {
  // 2xx
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx

  // 4xx
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,

  // 5xx
  INTERNAL_SERVER_ERROR = 500,
}
