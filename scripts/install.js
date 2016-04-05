#!/usr/bin/env node

// Just copy hook to after_prepare folder

var fs = require('fs'),
	path = require('path'),
	cwd = process.cwd();

var installFolder = path.join(cwd, '../../', 'hooks', 'after_prepare');
try {

	if (fs.lstatSync(installFolder).isDirectory()) {
		fs.createReadStream(path.join(cwd, 'index.js'))
			.pipe(fs.createWriteStream(path.join(installFolder, '020_ionic_optimizer.js')));
	}

} catch (err) {
	console.log('We\'ve got an error here:', err);
}
