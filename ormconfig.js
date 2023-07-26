module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
  database: 'intaap_v2',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};