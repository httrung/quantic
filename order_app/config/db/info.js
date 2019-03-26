module.exports = {
    schema: 'order_db.sql',
    database: 'order_db',
    username: 'root',
    password: 'abcd1234',
    host:'localhost',
    port:3306,
    dialect:'mysql',
    operatorsAliases:false,
    pool_max:5,
    pool_min:0,
    acquire:30000,
    idle: 10000
}