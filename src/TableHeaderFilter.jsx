import React from "react";
import autobind from "./autobind";
import {CLEAR_FILTER_BUTTON_CLICK, FILTER_BUTTON_CLICK} from './actions';
import {getColumnsToRender} from "./columnsHelper";
import deepClone from "./deepClone";

class TableHeaderFilter extends React.Component {
	constructor(props) {
		super(props);
		autobind(this);
		let filter = props.model.filter || {};
		this.state = {filter: filter};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filter: nextProps.model.filter || {}
		});
	}

	onClickClear() {
		this.setState({filter: {}});
		this.props.onEvent({
			eventName: CLEAR_FILTER_BUTTON_CLICK
		});
	}

	onClickFilter() {
		this.props.onEvent({
			eventName: FILTER_BUTTON_CLICK,
			filter: this.state.filter
		});
	}

	onChangeFilter(column, e) {
		let filter = deepClone(this.state.filter);
		filter[column.name] = e.target.value;
		this.setState({filter: filter});
	}

	renderFilterCell(column) {
		let info = column;
		let style = {};
		if (info.width && !this.props.model.narrow) {
			style.width = info.width;
		}
		return <th className={"table-header-" + column.name} key={column.name} style={style}>
			<input
				type="text"
				value={this.state.filter[column.name]}
				onChange={this.onChangeFilter.bind(this, column)}
				placeholder={this.props.model.narrow ? column.label || column.name : ''}
				name={column.name} className="form-control input-sm"/>
		</th>;
	}

	renderFilterHeaderCells() {
		return getColumnsToRender(this.props.model.columns).map(this.renderFilterCell);
	}

	render() {
		return <tr className="info">{this.renderFilterHeaderCells()}
			<th className="column-right">
				<div className="btn-group" role="group">
					<button className="btn btn-default btn-sm" data-title={this.props.model.labels.clearFilter}
						onClick={this.onClickClear}>
						<i className={this.props.model.icons.removeIcon}/>
					</button>
					<button className="btn btn-primary btn-sm" data-title={this.props.model.labels.filter}
						onClick={this.onClickFilter}>
						<i className={this.props.model.icons.filterIcon}/>
					</button>
				</div>
			</th>
		</tr>;
	}
}

TableHeaderFilter.propTypes = {
	model: React.PropTypes.shape({
		columns: React.PropTypes.object.isRequired,
		filter: React.PropTypes.object.isRequired,
		labels: React.PropTypes.shape({
			filter: React.PropTypes.string.isRequired,
			clearFilter: React.PropTypes.string.isRequired
		}),
		narrow: React.PropTypes.bool.isRequired
	}),
	onEvent: React.PropTypes.func
};

export default TableHeaderFilter;
