#!/usr/bin/env node

var fs = require('fs'),
	path = require('path'),
	cwd = process.cwd();

fs.unlink(path.join(cwd, '../../', 'hooks', 'after_prepare', '020_ionic_optimizer.js'));
console.log('Ionic optimizer successfully uninstalled. Thanks for using!');