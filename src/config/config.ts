const appConfig: Record<string, any> = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'armoney',
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
};

export default appConfig;
