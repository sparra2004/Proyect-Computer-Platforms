export const appConfig = () => ({
  port: parseInt(process.env.APP_PORT ?? '3000', 10) || 3000,
  env: process.env.APP_ENV || 'development',

  database: {
    type: process.env.DB_TYPE || 'sqlite',
    database: process.env.DB_DATABASE || 'database.sqlite',
    // host:     process.env.DB_HOST,
    // port:     parseInt(process.env.DB_PORT, 10) || 5432,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES || '3600s',
  },
});
