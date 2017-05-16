import React from "react";
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
	model: React.PropTypes.shape({
		labels: React.PropTypes.shape({
			total: React.PropTypes.string,
			records: React.PropTypes.string
		}),
		columns: React.PropTypes.object.isRequired,
		pager: React.PropTypes.shape({
			count: React.PropTypes.number.isRequired
		}).isRequired
	}),
	onEvent: React.PropTypes.func
};

export default TableFooter;