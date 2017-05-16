import React from "react";
import autobind from "./autobind";
import {getColumnsToRender} from "./columnsHelper";

class TableHeader extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
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
				style={style}>
				<span className="ellipsis-clip">
					{" "}
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
			style.width = this.props.actionColumnWidth + "px";
		}
		return <tr className="table-header">{this.renderTitleCells()}
			<th className="column-right" style={style}>
				{" "}
			</th>
		</tr>;
	}

	render() {
		return <thead>
		{this.renderTitleHeader()}
		</thead>;
	}
}

TableHeader.propTypes = {
	model: React.PropTypes.shape({
		columns: React.PropTypes.object.isRequired,
		narrow: React.PropTypes.bool.isRequired
	}),
	actionColumnWidth: React.PropTypes.number.isRequired,
	onEvent: React.PropTypes.func
};

export default TableHeader;