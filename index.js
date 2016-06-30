#!/usr/bin/env node

const Deployer = require('./deployer.js');
const deploy = new Deployer();

deploy.createPath();
deploy.createBundle();
