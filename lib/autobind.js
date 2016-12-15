'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (ctx) {
	var methods = Object.getOwnPropertyNames(ctx.constructor.prototype).filter(function (prop) {
		return typeof ctx[prop] === 'function';
	});
	methods.forEach(function (method) {
		ctx[method] = ctx[method].bind(ctx);
	});
};