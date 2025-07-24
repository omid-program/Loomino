// config.js
const isDev = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDev
  ? 'http://localhost:8000' // آدرس لوکال بکند
  : 'https://loomino.onrender.com'; // آدرس دیپلوی‌شده بکند
  
  export const API_INSIDE_URL = isDev
    ? 'http://localhost:3000' // آدرس لوکال فرانت
    : 'https://loomino.vercel.app'; // آدرس دیپلوی‌شده فرانت