module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'ranga',
  password: 'it371ananda',
  database: 'intaap_v2',
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};