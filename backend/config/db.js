import mysql from 'mysql2/promise';

const mysqlPool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Nitin@14368',
    database : 'tabledb',

}) 

export default mysqlPool;