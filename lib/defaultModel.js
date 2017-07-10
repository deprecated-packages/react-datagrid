"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	idColumn: "id",
	items: [],
	selected: [],
	dataSources: {},
	columns: {},
	sort: {
		order: [],
		columns: {}
	},
	filter: {},
	headerActions: {},
	classNameFactories: {
		row: function row() {
			return null;
		}
	},
	actions: {},
	settings: {
		header: true,
		filterHeader: false,
		footer: true,
		infiniteScroll: true,
		title: true,
		editableColumns: true
	},
	edit: {
		selected: [],
		buttons: {}
	},
	labels: {
		title: "Users",
		records: "records",
		filter: "Filter",
		itemsPerPage: "per page",
		clearFilter: "Clear Filter"
	},
	pager: {
		currentPageSize: 1,
		currentPage: 1,
		count: 1
	},
	icons: {
		deleteIcon: "icon-delete",
		filterIcon: "icon-filter",
		removeIcon: "icon-remove",
		radioOnIcon: "icon-circle",
		radioOffIcon: "icon-circle-blank",
		checkOnIcon: "icon-check",
		checkOffIcon: "icon-check-empty",
		sortUpIcon: "icon-sort-up",
		sortDownIcon: "icon-sort-down",
		menuIcon: "icon-table",
		nextIcon: "icon-caret-left",
		prevIcon: "icon-caret-right",
		caret: "icon-caret-down",
		removeTag: "icon-remove",
		clear: "icon-remove"
	}
};