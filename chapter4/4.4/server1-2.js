const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
}, (req, res) => {
    res.write('<h1>Hello</h1>');
    res.end('<p>Hello Server</p>')
;}).listen(8081, () => {
    console.log('listen to 8080');
})