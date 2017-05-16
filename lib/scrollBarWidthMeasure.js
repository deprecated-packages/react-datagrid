"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var divNode = document.createElement("div");
	divNode.innerHTML = "<div style=\"position: absolute; top: -100000px; left: -100000px;visibility: hidden; overflow-y: scroll\" id=\"scrollMeasure\"><div style=\"height: 3px;\"><div id=\"scrollMeasureIn\"></div></div></div></div>";
	document.body.appendChild(divNode);
	var outter = document.getElementById("scrollMeasure").offsetWidth;
	var inner = document.getElementById("scrollMeasureIn").clientWidth;
	return outter - inner;
};