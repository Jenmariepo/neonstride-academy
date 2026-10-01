export const HTTP = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  tooLarge: 413,
  internal: 500,
};
export const LIMITS = {
  port: 3000,
  page: 50,
  top: 5,
  maximumScore: 1000000,
  maximumRounds: 10000,
  tokenBytes: 32,
  body: '16kb',
  busyMilliseconds: 5000,
};
