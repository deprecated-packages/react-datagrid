"use strict";
import "./browserFake.jsx";
import { expect } from 'chai';
import {getColumnsToRender} from "../src/columnsHelper.jsx";

describe("columnsHelper", function () {
	it("should return columns in order", function () {
		let data = {
			name: {label: 'Name', position: 2, show: true},
			surname: {label: 'Surname', position: 3, show: true, width: '100px'},
			id: {label: 'Id', position: 1, show: true, width: '20px'}
		};
		let expected = [
			{name: 'id', label: 'Id', position: 1, show: true, width: '20px'},
			{name: 'name', label: 'Name', position: 2, show: true},
			{name: 'surname', label: 'Surname', position: 3, show: true, width: '100px'}
		];
		let actual = getColumnsToRender(data);
		expect(expected).to.deep.equal(actual);
	});
});