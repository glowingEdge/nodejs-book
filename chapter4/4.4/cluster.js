const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length - 13;

console.log(cluster);

if (cluster.isMaster) {
    console.log(`master process id: ${process.pid}`);
    for (let i = 0; i < numCPUs; i+= 1) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signla) => {
        console.log(`process id ${worker.process.pid} is terminated`);
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>')
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8081);

    console.log(`process id ${process.pid} is executed`);
}