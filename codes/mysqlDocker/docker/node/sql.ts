import * as mysql from 'promise-mysql';

async function connection() {
  const connection = await mysql.createConnection({
    host: 'db',
    user: 'docker',
    password: 'secret',
    database: 'typescript',
    multipleStatements: true
  });

  return connection;
}

connection().then(connection => {
  // console.log(connection);
  const result = connection.query('SELECT * FROM sample');
  connection.end();

  return result;
}).then(function(rows) {
  console.log(rows);
});