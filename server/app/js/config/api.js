// Cache ENV values
process.env = JSON.parse(JSON.stringify(process.env));

// API Endpoints
export const BASE_URL = process.env.API_BASE_URL;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const ENDPOINTS = {

};
export const TIMEOUT = 0;
