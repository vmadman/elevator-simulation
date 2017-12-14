/**
 * Defines the BaseClass.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const _ 	= require( "lodash" );
const TIPE 	= require( "tipe" );
const EYES 	= require( "eyes" );

/**
 * An abstract root class that ALL project classes inherit from.
 *
 * @abstract
 */
class BaseClass {

	constructor( cfg ) {
		let me = this;
		me._initPropertyDefaults();
		me._configure( cfg );
	}

	_initPropertyDefaults() {

	}

	_configure( cfg ) {

	}

}

module.exports = BaseClass;