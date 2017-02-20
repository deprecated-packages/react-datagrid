import React from "react";
import autobind from "./autobind";
import {ROW_BUTTON_CLICK, ROW_CLICK} from './actions';
import {getColumnsToRender} from "./columnsHelper";
class TableRow extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	_getFromDataSource(value, info) {
		if (!this.props.dataSources && !this.props.dataSources.hasOwnProperty(info.dataSource)) {
			return value;
		}
		if (Array.isArray(value)) {
			value = this.props.dataSources[info.dataSource].filter(i => value.includes(i[info.id]));
		} else {
			let arrayOfValues = this.props.dataSources[info.dataSource].filter(i => i[info.id] === value);
			if (arrayOfValues.length === 1) {
				value = arrayOfValues[0];
			}
		}
		return value;
	}

	renderValue(info, name) {
		let value = this.props.item[name];
		if (info.dataSource) {
			value = this._getFromDataSource(value, info);
		}
		return info.render ? info.render(value, this.props.item) : value;
	}

	renderNarrowOrNormal(info, name) {
		if (this.props.narrow && getColumnsToRender(this.props.columns).length > 1) {
			return <span className="row-narrow">
				<span className="row-label">{info.label || name}</span>
				<span className="row-value">{this.renderValue(info, name)}</span>
			</span>;
		}
		return <span className="ellipsis-clip">
			{this.renderValue(info, name)}
		</span>;
	}

	renderCell(name) {
		let info = this.props.columns[name];
		if (info.show) {
			return <td className={"table-cell-" + name} key={name}>
				<span className="ellipsis-clip">
					{this.renderNarrowOrNormal(info, name)}
				</span>
			</td>;
		} else {
			return null;
		}
	}

	renderRowBody() {
		return Object.keys(this.props.columns).map(this.renderCell);
	}

	onActionButtonClick(name, e) {
		e.stopPropagation();
		e.preventDefault();
		let event = {
			item: this.props.item,
			eventName: ROW_BUTTON_CLICK,
			buttonName: name
		};
		this.props.onEvent(event);

	}

	renderActionButton(name) {
		let action = this.props.actions[name];
		if (action.icon) {
			return <button key={name}
				onClick={this.onActionButtonClick.bind(this, name)}
				className="btn btn-xs btn-default"
				title={action.label}><i className={action.icon}/></button>;
		} else {
			return <button key={name}
				onClick={this.onActionButtonClick.bind(this, name)}
				className="btn btn-xs btn-default">{action.label}</button>;
		}
	}

	renderActions() {
		return Object.keys(this.props.actions).map(this.renderActionButton);
	}

	onRowClick(e) {
		let event = {
			item: this.props.item,
			eventName: ROW_CLICK,
			keys: {ctrl: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey}
		};
		this.props.onEvent(event);
	}

	render() {
		let className = this.props.selected ? "active" : "";
		return <tr onClick={this.onRowClick} className={className}>
			{this.renderRowBody()}
			<td className="column-right actions"><div className="btn-group">{this.renderActions()}</div></td>
		</tr>;
	}
}

TableRow.propTypes = {
	item: React.PropTypes.object.isRequired,
	dataSources: React.PropTypes.object,
	columns: React.PropTypes.object.isRequired,
	actions: React.PropTypes.object,
	onEvent: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
	narrow: React.PropTypes.bool.isRequired
};

TableRow.defaultProps = {
	dataSources: {},
	actions: {}
};

export default TableRow;