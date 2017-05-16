import React from "react";
import autobind from "./autobind";
import {ROW_BUTTON_CLICK, ROW_CLICK} from "./actions";
import {getColumnsToRender} from "./columnsHelper";
import Select from "react-select";
import deepClone from "./deepClone";

class TableRowEditor extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
		this.state = {
			item: props.item
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({item: nextProps.item});
	}

	onChangeValue(e) {
		const item = deepClone(this.state.item);
		item[e.target.name] = e.target.value;
		this.setState({item: item});
	}

	onChangeSelectValue(name, value) {
		const item = deepClone(this.state.item);
		item[name] = value;
		this.setState({item: item});
	}

	renderValue(info, name) {
		let value = this.state.item[name];
		if (info.dataSource) {
			const options = this.props.dataSources[info.dataSource];
			return <Select className="form-control-block"
				name={name}
				options={options}
				value={value}
				simpleValue={info.simpleValue}
				cache={false}
				multi={info.multi}
				valueKey={info.valueId}
				labelKey={info.labelId}
				clearable={info.clearable}
				onChange={this.onChangeSelectValue.bind(this, name)}
			/>;
		} else if (info.editType === "checkbox") {
			return <input
				checked={value ? "checked" : false}
				name={name}
				type="checkbox"
				onChange={this.onChangeValue}
			/>;
		} else {
			return <input
				value={value}
				name={name}
				className="form-control"
				onChange={this.onChangeValue}
			/>;
		}
	}

	renderNarrowOrNormal(info, name) {
		if (this.props.narrow && getColumnsToRender(this.props.columns).length > 1) {
			return <span className="row-narrow">
				<span className="row-label">{info.label || name}</span>
				<span className="row-value">{this.renderValue(info, name)}</span>
			</span>;
		}
		return this.renderValue(info, name);
	}

	renderCell(name) {
		let info = this.props.columns[name];
		if (info.show) {
			return <td className={"table-edit table-cell-" + name} key={name}>
				{this.renderNarrowOrNormal(info, name)}
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
			item: this.state.item,
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
				className="btn btn-sm btn-default"
				data-title={action.label}><i className={action.icon}/></button>;
		} else {
			return <button key={name}
				onClick={this.onActionButtonClick.bind(this, name)}
				className="btn btn-sm btn-default">{action.label}</button>;
		}
	}

	renderActions() {
		return Object.keys(this.props.actions).map(this.renderActionButton);
	}

	onRowClick(e) {
		let event = {
			item: this.state.item,
			eventName: ROW_CLICK,
			keys: {ctrl: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey}
		};
		this.props.onEvent(event);
	}

	render() {
		let className = this.props.selected ? "active" : "";
		return <tr className={className}>
			{this.renderRowBody()}
			<td className="table-edit column-right actions">
				<div className="btn-group">{this.renderActions()}</div>
			</td>
		</tr>;
	}
}

TableRowEditor.propTypes = {
	item: React.PropTypes.object.isRequired,
	dataSources: React.PropTypes.object,
	columns: React.PropTypes.object.isRequired,
	actions: React.PropTypes.object,
	onEvent: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
	narrow: React.PropTypes.bool.isRequired
};

TableRowEditor.defaultProps = {
	dataSources: {},
	actions: {}
};

export default TableRowEditor;