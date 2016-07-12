var Util = require('util');
var Exec = require('child_process').execSync;
var OS = require('os');

function Deployer(host, username) {
    var cwd = process.cwd().split('/');
    // this.user = 'khairul';
    // this.host = '172.18.26.120';
    this.user = username;
    this.host = host;
    this.appName = cwd[cwd.length-1];
    this.publishDir = '/opt/' + this.appName;
    this.packageDir = '/home/' + this.user + '/.deployer';
    this.bundleName = this.appName + '.tar.gz';
    this.bundlePath = OS.tmpdir();
    this.bundle = this.bundlePath + '/' + this.bundleName;
    this.SSH = 'ssh '+this.user+'@'+this.host;
}

Deployer.prototype = {

    constructor: Deployer,

    logs: function(error, stdout, stderr) {
        console.log('error: '+error);
        console.log('stdout: '+stdout);
        console.log('stderr: '+stderr);
    },

    createPath: function() {
        console.log("* Create package directory:", this.packageDir);
        Exec(this.SSH +' -tq "mkdir -p '+this.packageDir+'"', this.logs);
        console.log("* Create publish directory:", this.publishDir);
        Exec(this.SSH+' -tq "sudo mkdir -p '+this.publishDir+'"', this.logs);
        // Exec('sudo chown '+this.user+':'+this.user+' '+this.publishDir, this.logs);
    },

    createBundle: function() {
        console.log("* Packaging bundle at", this.bundle);
        Exec('meteor build '+this.bundlePath+' --server-only', this.logs);
    },

    pushBundle: function() {
        console.log("* Pushing bundle to", this.packageDir+'/'+this.bundleName);
        Exec('scp '+this.bundle+' '+this.user+'@'+this.host+':'+this.packageDir+'/'+this.bundleName, this.logs);
        console.log("* Moving bundle to", this.publishDir+'/'+this.bundleName);
        Exec(this.SSH+' -tq "sudo mv '+this.packageDir+'/'+this.bundleName+' '+this.publishDir+'/'+this.bundleName+'"', this.logs);
    },

    extractBundle: function() {
        console.log("* Extracting bundle to", this.publishDir+"/bundle");
        Exec(this.SSH+' -tq "sudo tar xzf '+this.publishDir+'/'+this.bundleName+' -C '+this.publishDir+'"', this.logs);
        console.log("* Change bundle ownership to", this.user);
        Exec(this.SSH+' -tq "sudo chown -R '+this.user+': '+this.publishDir+'/bundle"', this.logs);
    },

    npmInstall: function() {
        console.log("* Install NPM dependencies for production");
        Exec(this.SSH+' -tq "cd '+this.publishDir+'/bundle/programs/server;npm install --production"', this.logs);
    }
}


module.exports = Deployer;
