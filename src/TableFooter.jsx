import React from "react";
import PropTypes from "prop-types";
import autobind from "./autobind";
import TablePager from "./TablePager";
import TablePagerPageSize from "./TablePagerPageSize";
import {getColumnsToRender} from "./columnsHelper";
class TableFooter extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	render() {
		return <tfoot>
		<tr onClick={this.onRowClick}>
			<td colSpan={getColumnsToRender(this.props.model.columns).length + 1}>
				<span className="total-count">{this.props.model.pager.count} {this.props.model.labels.records}</span>
				{" "}
				<TablePagerPageSize {...this.props} onEvent={this.props.onEvent}/>
				<TablePager {...this.props} />
			</td>
		</tr>
		</tfoot>;
	}
}

TableFooter.propTypes = {
	model: PropTypes.shape({
		labels: PropTypes.shape({
			total: PropTypes.string,
			records: PropTypes.string
		}),
		columns: PropTypes.object.isRequired,
		pager: PropTypes.shape({
			count: PropTypes.number.isRequired
		}).isRequired
	}),
	onEvent: PropTypes.func
};

export default TableFooter;