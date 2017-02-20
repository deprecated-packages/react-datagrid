import React from "react";
import autobind from "./autobind";
import {HEADER_BUTTON_CLICK, HEADER_CLICK} from './actions';
import TableHeaderFilter from "./TableHeaderFilter";
import DropdownMenu from "./DropdownMenu";
import {getColumnsToRender} from "./columnsHelper";

class TableHeader extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	renderSortArrow(name) {
		if (this.props.model.sort.columns[name] === 'DESC') {
			return <i className={this.props.model.icon.sortDownIcon}/>;
		} else if (this.props.model.sort.columns[name] === 'ASC') {
			return <i className={this.props.model.icon.sortUpIcon}/>;
		} else {
			return null;
		}
	}

	onTableClick(name) {
		this.props.onEvent({eventName: HEADER_CLICK, columnName: name});
	}

	renderTitleCell(column) {
		if (column.show) {
			let style = {};
			if (column.width && !this.props.model.narrow) {
				style.width = column.width;
			}
			return <th
				className={"table-header-" + column.name}
				key={column.name}
				style={style}
				onClick={this.onTableClick.bind(this, column.name)}>
				<span className="ellipsis-clip">
					{column.label ? column.label : column.name}
					<span className="pull-right">{this.renderSortArrow(column.name)}</span>
				</span>
			</th>;
		} else {
			return null;
		}
	}

	renderTitleCells() {
		if (!this.props.model.narrow) {
			return getColumnsToRender(this.props.model.columns).map(this.renderTitleCell);
		}
	}

	onActionButtonClick(name, e) {
		e.preventDefault();
		e.stopPropagation();
		let event = {
			eventName: HEADER_BUTTON_CLICK,
			buttonName: name
		};
		this.props.onEvent(event);
	}

	renderTitleButton(name) {
		let action = this.props.model.headerActions[name];
		if (action.icon) {
			return <button key={name}
				className="btn btn-xs btn-default"
				onClick={this.onActionButtonClick.bind(this, name)}
				title={action.label}>
				<i className={action.icon}/>
			</button>;
		} else {
			return <button
				onClick={this.onActionButtonClick.bind(this, name)}
				key={name}
				className="btn btn-xs btn-default">
				{action.label}
			</button>;
		}
	}

	renderTitleHeaderActions() {
		if (this.props.model.headerActions) {
			return Object.keys(this.props.model.headerActions).map(this.renderTitleButton);
		} else {
			return null;
		}
	}

	renderTitleButtons() {
		if (Object.keys(this.props.model.headerActions).length > 0) {
			return <div className="btn-group" role="group">
				{this.renderTitleHeaderActions()}
			</div>;
		} else {
			return null;
		}
	}

	renderColumnsSettingsMenu() {
		if (!this.props.model.settings.editableColumns) {
			return null;
		}
		let items = Object.keys(this.props.model.columns).map(columnName => {
			let label = columnName;
			if (this.props.model.columns[columnName].hasOwnProperty('label')) {
				label = this.props.model.columns[columnName].label;
			}
			return {
				label: label,
				type: 'checker',
				name: columnName
			};
		});
		return <DropdownMenu
			items={items}
			icon={this.props.model.icons.menuIcon}
			model={this.props.model}
			name="column-settings"
			menuClassName="dropdown-menu-right"
			label="Columns"
			onEvent={this.props.onEvent}
			selected={getColumnsToRender(this.props.model.columns).map(c => c.name)}
		/>;
	}

	renderTitleForNarrow() {
		let columnsToRender = getColumnsToRender(this.props.model.columns);
		if (this.props.model.narrow && columnsToRender.length === 1) {
			return <span className="single-column">{columnsToRender[0].label || columnsToRender[0].name}</span>;
		} else {
			return null;
		}
	}

	renderTitleHeader() {
		let style = {};
		if (!this.props.model.narrow) {
			style.width = this.props.actionColumnWidth + 'px';
		}
		return <tr className="table-header">{this.renderTitleCells()}
			<th className="column-right" style={style}>
				{this.renderTitleForNarrow()}
				{this.renderTitleButtons()}
				{' '}
				{this.renderColumnsSettingsMenu()}
			</th>
		</tr>;
	}

	renderFilterHeader() {
		if (this.props.model.settings.filterHeader) {
			return <TableHeaderFilter {...this.props} />;
		} else {
			return null;
		}
	}

	render() {
		return <thead>
			{this.renderTitleHeader()}
			{this.renderFilterHeader()}
		</thead>;
	}
}

TableHeader.propTypes = {
	model: React.PropTypes.shape({
		sort: React.PropTypes.shape({
			order: React.PropTypes.array.isRequired,
			columns: React.PropTypes.object.isRequired
		}).isRequired,
		columns: React.PropTypes.object.isRequired,
		headerActions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.shape({
			filterHeader: React.PropTypes.bool.isRequired,
			editableColumns: React.PropTypes.bool.isRequired
		}).isRequired,
		narrow: React.PropTypes.bool.isRequired
	}),
	actionColumnWidth: React.PropTypes.number.isRequired,
	onEvent: React.PropTypes.func
};

export default TableHeader;