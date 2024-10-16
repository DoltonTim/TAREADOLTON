const mysql = require('mysql2');
const connection = mysql.createConnection({

host:'localhost',
user:'root',
password:'1234',
database:'dbnode'

});
 connection.connect((err)=> {
    if(err){
        console.log('error de conection a MYSQL:',err);
        return;
    }else{
        console.log('conectado a BD MYSQL');
    }
});
module.exports = connection;