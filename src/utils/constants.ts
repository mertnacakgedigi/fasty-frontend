export const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://api.fastyrelay.com'
    : 'http://localhost:3002';
