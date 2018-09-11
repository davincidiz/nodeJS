var http = require('http'); 
var mysql = require('mysql');

var mysql_result = null;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'privateo_lk',
    port: 3306
})

connection.connect();

var query = connection.query('SELECT * FROM  avusers', function(error, result) {
    if(error) throw error;
    mysql_result = result[0].login;
    console.log(mysql_result);
});

connection.end();

function getResponse(request, response) {
    console.log('Sended http request');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(mysql_result);
    response.end();
}

http.createServer(getResponse).listen(8888);

console.log('Start HTTP Server');
