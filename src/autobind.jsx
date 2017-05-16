/*helper for autobinding methods to this to simpler migration from React.createClass*/
export default function (ctx) {
	let methods = Object.getOwnPropertyNames(ctx.constructor.prototype).filter(prop => typeof ctx[prop] === "function");
	methods.forEach(method => {
		ctx[method] = ctx[method].bind(ctx);
	});
}