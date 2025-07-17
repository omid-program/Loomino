// config.js
const isDev = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDev
  ? 'http://localhost:8000' // آدرس لوکال بکند
  : 'https://your-app.onrender.com'; // آدرس دیپلوی‌شده بکند
