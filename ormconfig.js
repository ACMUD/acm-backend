module.exports = {
  type: 'postgres',
  host: process.env.DBHOST || 'localhost',
  port: parseInt(process.env.DBPORT || '5432'),
  username: process.env.DBUSER || 'test',
  password: process.env.DBPASS || 'test',
  database: process.env.DBNAME || 'test',
  entities: ['src/**/entities/*.ts'],
  logging: process.env.NODE_ENV === 'development',
};
