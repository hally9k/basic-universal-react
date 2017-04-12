// Cache ENV values
process.env = JSON.parse(JSON.stringify(process.env));

// App
export const APP_ENV = process.env.NODE_ENV || 'production';


// Meta
export const APP_NAME = 'Auckland Zoo';
export const APP_NAME_IOS = 'Auckland Zoo';
export const APP_AUTHOR = 'Auckland Zoo';


// Social
export const INSTAGRAM_USER = 'aucklandzoo';
export const TUMBLR_USER = 'aucklandzoo';
export const TWITTER_USER = '@AucklandZoo';
export const YOUTUBE_USER = 'aucklandzoo';
export const FACEBOOK_APP_ID = '';

export const FACEBOOK_URL = 'https://www.facebook.com/AKLZOONZ/';
export const INSTAGRAM_URL = 'http://instagram.com/aucklandzoo';
export const TWITTER_URL = 'http://twitter.com/aucklandzoo';
export const YOUTUBE_URL = 'http://youtube.com/user/aucklandzoo';


// Analytics
export const GA_CODE = '';


// Google API key
export const GOOGLE_API_KEY = '';


// Ticketmaster
// export const LOGIN_URL = '';


// Data formatting
export const DATE_FORMAT_MIN = 'D MMM';
export const DATE_FORMAT_FULL = 'YYYY-MM-DD';
export const PRICE_FORMAT = '$0,0.00';
export const NZ_UTC_OFFSET = 12;
