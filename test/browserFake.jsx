/*eslint no-console: 0*/
import jsdom from 'jsdom';

/************ Mimic the browser **************/
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = document.defaultView;
global.document = document;
global.window = window;

/* From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80 */
function propagateToGlobal(window) {
	for (const key in window) {
		if (!window.hasOwnProperty(key)) {
			continue;
		}
		if (key in global) {
			continue;
		}

		global[key] = window[key];
	}
}

/* Take all properties of the window object and also attach it to the mocha global object */
propagateToGlobal(window);
