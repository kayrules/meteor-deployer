#!/usr/bin/env node

var Deployer = require('./deployer.js');
var deploy = new Deployer();

deploy.createPath();
deploy.createBundle();
deploy.pushBundle();
