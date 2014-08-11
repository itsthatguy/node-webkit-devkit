
var spawn   = require('child_process').spawn,
    path    = require('path');

// Run npm install in the app folder to ensure all dependencies are met
var cwd = path.join(process.env.PWD, 'app');
spawn('npm', ['install'], { stdio: 'inherit' });
spawn('npm', ['install'], { cwd: cwd, stdio: 'inherit' } );

