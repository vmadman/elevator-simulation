/**
 * This file creates a global object that provides a number of useful
 * tools and utilities for testing.  It is loaded, automatically, by Mocha
 * (via the --require arg) and, therefore, does not need to be required.
 *
 * @module _globals
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2017-12-04
 */
"use strict";

// Say hello
console.log("[auto-globals] Loading global unit testing tools & utilities .. ");

// Init global utilities object
let u = {
	env: {},
	libs: {},
	paths: {}
};

/** @global */
global.utils = u;

// Dependencies
let EYES 					= require("eyes");
let TIPE 					= require("tipe");
let LODASH 					= require("lodash");
let CHAI					= require("chai");
let BLUEBIRD 				= require("bluebird");
let PATH					= require("path");


// We'll go ahead and allow some of the
// dependency modules to exist as globals.
global.expect	= CHAI.expect;

// Everything else will be accessible
// through the global 'utils' object.
u.libs = {
	eyes		: EYES,
	tipe		: TIPE,
	lodash		: LODASH,
	chai		: CHAI,
	bluebird	: BLUEBIRD,
	path		: PATH
};

