var Util = require('util');
var Exec = require('child_process').execSync;
var OS = require('os');

function Deployer() {
    var cwd = process.cwd().split('/');
    // this.user = 'khairul';
    // this.host = '172.18.26.120';
    this.user = 'jarvis';
    this.host = '192.168.110.210';
    this.appName = cwd[cwd.length-1];
    this.remotePath = '/home/' + this.user + '/.deployer';
    this.bundleName = this.appName + '.tar.gz';
    this.bundlePath = OS.tmpdir();
    this.bundle = this.bundlePath + '/' + this.bundleName;
}

Deployer.prototype = {

    constructor: Deployer,

    createPath: function() {
        console.log("* Create remote path:", this.remotePath);
        Exec('ssh '+this.user+'@'+this.host+' -tq "mkdir -p '+this.remotePath+'"', this.logs);
    },

    createBundle: function() {
        console.log("* Packaging bundle at", this.bundle);
        Exec('meteor build '+this.bundlePath+' --server-only', this.logs);
    },

    pushBundle: function() {
        console.log("* Pushing bundle to", this.remotePath+'/'+this.bundleName);
        Exec('scp '+this.bundle+' '+this.user+'@'+this.host+':'+this.remotePath+'/'+this.bundleName, this.logs);
    },

    logs: function(error, stdout, stderr) {
        console.log('error: '+error);
        console.log('stdout: '+stdout);
        console.log('stderr: '+stderr);
    }
}

// -- bundling files
// console.log("bundling files");
//
// });
//
// // -- create path
// console.log("create path");
// exec('ssh '+user+'@'+host+' -tq "mkdir -p '+path+'"', logs);
//
// // -- push package to server
// console.log("push package to server");
// exec('scp ../output/'+bundle+' '+user+'@'+host+':'+path+'/'+bundle, logs);
//
// console.log("DONE");


module.exports = Deployer;
