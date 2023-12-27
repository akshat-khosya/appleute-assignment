export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 4000,
  MONGODB_URL: process.env.MONGODB_URL || '',
  saltRounds: parseInt(process.env.SALT) || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'configNameIs10',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
});
