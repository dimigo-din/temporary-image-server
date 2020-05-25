import app from './app';

const APP_PORT = 8032;

app.listen(
  APP_PORT,
  () => {
    console.info('✅ Started backend server');
    console.info(`☁️ Running on: http://localhost:${APP_PORT}`);
  },
);
