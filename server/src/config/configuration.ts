export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 4000,
  MONGODB_URL: process.env.MONGODB_URL || '',
  saltRounds: parseInt(process.env.SALT) || 10,
});
