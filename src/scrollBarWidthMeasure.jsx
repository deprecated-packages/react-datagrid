export default function () {
	let divNode = document.createElement("div");
	divNode.innerHTML = "<div style=\"position: absolute; top: -100000px; left: -100000px;visibility: hidden; overflow-y: scroll\" id=\"scrollMeasure\"><div style=\"height: 3px;\"><div id=\"scrollMeasureIn\"></div></div></div></div>";
	document.body.appendChild(divNode);
	let outter = document.getElementById("scrollMeasure").offsetWidth;
	let inner = document.getElementById("scrollMeasureIn").clientWidth;
	return outter - inner;
}