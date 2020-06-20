const http = require('http');

const server = http.createServer((req, res) => {
   res.write('<h1>Hello Node!</h1>');
   res.end('<p>hello server</p>'); 
});

server.listen(80);
server.on('listening', () => {
    console.log('8080 port is listening');
});
server.on('error', (error) => {
    console.error(error);
});