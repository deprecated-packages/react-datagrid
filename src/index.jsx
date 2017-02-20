/*eslint no-console: 0*/
import React from "react";
import update from "react-addons-update";
import {render} from "react-dom";
import DataGrid from "./DataGrid";
import sampleModel from "./model";
import EVENT from "./actions";
import deepClone from "./deepClone";
import multiSort from "./multiSort";
import {getColumnsToRender} from "./columnsHelper";
import scrollBarWidthMeasure from "./scrollBarWidthMeasure.jsx";

import "../styles/main.less";
import "bootstrap";
import "../styles/css/bootstrap.css";
import "../styles/css/app.css";
import "../styles/css/pe-icon-7-stroke.css";
import autobind from "./autobind";

let scrollBarWidth = scrollBarWidthMeasure();

sampleModel.pager.currentPageSize = 100;
sampleModel.settings.footer = false;
sampleModel.settings.infiniteScroll = true;

function getItems(model) {
	let pager = model.pager;
	let from = (pager.currentPage - 1) * pager.currentPageSize;
	let to = from + pager.currentPageSize;
	let items = deepClone(sampleModel.items);
	items = items.filter(i => {
		let match = true;
		for (let columnName of Object.keys(model.filter)) {
			let filter = model.filter[columnName];
			if (filter && filter.length && i[columnName].indexOf(filter) === -1) {
				match = false;
			}
		}
		return match;
	});
	items = items.sort(multiSort.bind(this, model.sort.order, model.sort.columns));
	return items.slice(from, to);
}

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		autobind(this);
		let model = deepClone(sampleModel);
		model.items = getItems(sampleModel);
		model.narrow = false;
		model.headerActions = {
			plus: {
				label: 'Plus',
				icon: 'icon-plus'
			}
		};
		this.state = {model: model};
	}

	onResize(info) {
		let columns = getColumnsToRender(this.state.model.columns);
		let minWidth = columns.reduce((sum, i) => {
			return parseInt(i.width ? i.width : 0) + sum;
		}, 100);
		let narrow = info.width < minWidth;
		let model = update(this.state.model, {narrow: {$set: narrow}});
		this.setState({model: model});
	}

	onEvent(event) {
		let model = this.state.model;
		if (event.eventName === EVENT.GOTO_PAGE) {
			model.pager.currentPage = event.pageNumber;
		}
		if (event.eventName === EVENT.NEXT_PAGE) {
			model.pager.currentPage++;
		}
		if (event.eventName === EVENT.PREV_PAGE) {
			model.pager.currentPage--;
		}
		if (event.eventName === EVENT.SELECT_MENU_ITEM && event.menuName === 'column-settings') {
			model.columns[event.item.name].show = !model.columns[event.item.name].show;
		}
		if (event.eventName === EVENT.HEADER_CLICK) {
			if (model.sort.columns[event.columnName] === 'ASC') {
				model.sort.columns[event.columnName] = 'DESC';
			} else if (model.sort.columns[event.columnName] === 'DESC') {
				delete model.sort.columns[event.columnName];
				model.sort.order = model.sort.order.filter(i => i !== event.columnName);
			} else {
				model.sort.columns[event.columnName] = 'ASC';
				model.sort.order.push(event.columnName);
			}
		}
		if (event.eventName === EVENT.HEADER_BUTTON_CLICK && event.buttonName === 'filter') {
			model.settings.filterHeader = !model.settings.filterHeader;
		}
		if (event.eventName === EVENT.CLEAR_FILTER_BUTTON_CLICK) {
			model.filter = {};
		}
		if (event.eventName === EVENT.FILTER_BUTTON_CLICK) {
			model.filter = event.filter;
		}
		if (event.eventName === EVENT.ROW_CLICK) {
			model.selected = [event.item.myId];
		}
		if (event.eventName === EVENT.SET_PAGE_SIZE) {
			model.pager.currentPageSize = event.pageSize;
		}
		model.items = getItems(model);
		if (event.eventName === EVENT.ROW_BUTTON_CLICK && event.buttonName === 'edit') {
			for (let i = 0; i < model.items.length; i++) {
				if (model.items[i].myId === event.item.myId) {
					model.items[i] = event.item;
					console.log('saved');
				}
			}
		}
		console.log(event);
		this.setState({model: model});
	}

	render() {
		return <DataGrid tableClassName="table table-hover table-bordered table-condensed"
			onResize={this.onResize}
			model={this.state.model}
			onEvent={this.onEvent}
			scrollBarWidth={scrollBarWidth}
			actionColumnWidth={100}
		/>;
	}
}

render(<Wrapper />, document.getElementById('data-grid-mount'));