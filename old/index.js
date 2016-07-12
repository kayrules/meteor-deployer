#!/usr/bin/env node

var Deployer = require('./deployer.js');
// var deploy = new Deployer('192.168.110.210', 'jarvis');
var deploy = new Deployer('172.18.26.120', 'khairul');

deploy.createPath();
deploy.createBundle();
deploy.pushBundle();
deploy.extractBundle();
deploy.npmInstall();
