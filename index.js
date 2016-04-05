#!/usr/bin/env node

'use strict';

var fs = require('fs'),
	path = require('path'),
	useref = require('node-useref'),
	async = require('async'),
	annotater = require('ng-annotate'),
	minifier = require('uglify-js');

// Temporary place
// Loop should start here
var workingDir = 'www';

var result = useref(fread(djoin('index.html'))),
	resources = result[1].js;


console.log('Processing index.html');
fs.writeFileSync(djoin('index.html'), result[0]);

for (var filename in resources) {

	// Get updated array of assets
	var assets = prepareAssetsLinks(resources[filename].assets),
		uglified;

	// Check if not vendor
	// todo: parameterize this limitation
	if (filename === 'app.js') {

		// Annotating in parallel
		console.log('Annotaing application\'s sources');
		async.each(assets, annotateFile, function (err) {
			if (err) {
				console.error(err);
			}

			console.log('Minifying application\'s sources');
			// todo: implement parametric callback
			fs.writeFile(djoin(filename), minifier.minify(assets).code, function (err) {
				if (err)
					console.error(err);

				console.log('Removing sources folder');
				deleteFolderRecursive(djoin('js'));
			});
		})
	} else {
		console.log('Minifying vendor sources');
		// todo: implement parametric callback
		fs.writeFile(djoin(filename), minifier.minify(assets).code, function (err) {
			if (err)
				console.error(err);

			console.log('Removing sources folder');
			deleteFolderRecursive(djoin('lib'));
		});
	}
}


// todo: replace working dir here
function djoin(p) {
	return path.normalize(path.join(__dirname, workingDir, p));
}
function fread(f) {
	return fs.readFileSync(f, {encoding: 'utf-8'});
}
function prepareAssetsLinks(array) {
	var result = [];

	for (var i = 0; i < array.length; i++)
		result.push(djoin(array[i]))

	return result;
}

function annotateFile(item, cb) {

	// Annotating file
	var res = annotater(fread(item) + '"ngInject";', {
		add: true,
		single_quotes: true
	});

	// Overwriting original file and removing ngInject
	fs.writeFile(item, res.src.replace('"ngInject";', ''), function (err) {
		if (err) cb(err);
		else cb()
	});
}

function deleteFolderRecursive(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}