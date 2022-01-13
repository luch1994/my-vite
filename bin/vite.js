#!/usr/bin/env node

var program = require('commander');
const startServer = require('../src/index.js');
const package = require('../package');

program.version(package.version);

const start = (cmd) => {
    let port = 3000, root = process.cwd();
    if (cmd.port) {
        port = parseInt(cmd.port);
    }
    startServer({
        port,
        root,
    });
}

const addProgram = program => {
    program.option('-p --port <port>', 'set server port，default 3000；设置服务器启动端口，默认3000')
    .action(start);
}

addProgram(program);

program.parse(process.argv);