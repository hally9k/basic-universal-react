// Cache ENV values
// process.env = JSON.parse(JSON.stringify(process.env));

// API Endpoints
export const BASE_URL = 'http://api.rfadev.pixelfusion.co.nz/v1';
export const CLIENT_ID = 'rfa-app-live';
export const CLIENT_SECRET = 'appSecret';
export const ENDPOINTS = {
    PAGES: `${BASE_URL}/content/pages?slug=`,
    TOKEN: `${BASE_URL}/oauth/token`
};
export const TIMEOUT = 0;
