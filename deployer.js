var util = require('util');
var exec = require('child_process').execSync;
var os = require('os');

function Deployer() {
    this.user = 'khairul';
    this.host = '172.18.26.120';
    this.path = '/home/'+this.user+'/meteor-deploy';
    this.bundleName = 'package.tar.gz';
    this.bundlePath = os.tmpdir();
}

Deployer.prototype = {

    constructor: Deployer,

    createBundle: function() {
        console.log("--- createBundle: ", this.bundlePath);
        exec('meteor build '+this.bundlePath+' --server-only', this.logs);
    },

    createPath: function() {
        console.log("--- createPath");
        exec('ssh '+this.user+'@'+this.host+' -tq "mkdir -p '+this.path+'"', this.logs);
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
