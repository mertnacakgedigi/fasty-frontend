export const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'http://api.fastyrelay.com:3002'
    : 'http://localhost:3002';
