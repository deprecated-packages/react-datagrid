import React from "react";
import autobind from "./autobind";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRowEditor from "./TableRowEditor";
import TableFooter from "./TableFooter";
import TableTitle from "./TableTitle";
import TableBodyHeader from "./TableBodyHeader";

class DataGrid extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	onResize() {
		if (this.props.onResize) {
			this.props.onResize({
				width: this._dataGridRootNode.clientWidth,
				height: this._dataGridRootNode.clientHeight
			});
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize, true);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize, true);
	}

	renderBody() {
		return this.props.model.items.map(this.renderRow);
	}

	renderRow(item) {
		const selected = this.props.model.selected.includes(item[this.props.model.idColumn]);
		const edit = this.props.model.edit.selected.includes(item[this.props.model.idColumn]);
		if (edit) {
			return <TableRowEditor
				item={item}
				selected={selected}
				dataSources={this.props.model.dataSources}
				onEvent={this.props.onEvent}
				columns={this.props.model.columns}
				actions={this.props.model.edit.buttons}
				narrow={this.props.model.narrow}
				key={item[this.props.model.idColumn]}
			/>;
		} else {
			return <TableRow
				item={item}
				selected={selected}
				dataSources={this.props.model.dataSources}
				onEvent={this.props.onEvent}
				columns={this.props.model.columns}
				actions={this.props.model.actions}
				narrow={this.props.model.narrow}
				key={item[this.props.model.idColumn]}/>;
		}
	}

	renderHeader() {
		if (this.props.model.settings.header) {
			return <TableHeader
				actionColumnWidth={this.props.actionColumnWidth}
				model={this.props.model}
				onEvent={this.props.onEvent}/>;
		} else {
			return null;
		}
	}

	renderFooter() {
		if (this.props.model.settings.footer) {
			return <TableFooter model={this.props.model} onEvent={this.props.onEvent}/>;
		} else {
			return null;
		}
	}

	renderTableTitle() {
		if (this.props.model.settings.title) {
			return <TableTitle {...this.props} />;
		} else {
			return null;
		}
	}

	render() {
		let className = "data-grid " + (this.props.className || '');
		if (this.props.model.narrow) {
			className += " narrow";
		}
		let scrollerClassName = "";
		let actionColumnWidth = this.props.actionColumnWidth;
		let infiniteScroll = this.props.model.settings.infiniteScroll;
		if (infiniteScroll) {
			scrollerClassName = "scroller";
			//we need to adjust the action column for table body because of scrollbar
			//so the columns match with header
			actionColumnWidth = this.props.actionColumnWidth - (infiniteScroll ? this.props.scrollBarWidth : 0);
		}
		return <div className={className} ref={(c) => {this._dataGridRootNode = c;}}>
			{this.renderTableTitle()}
			<table className={this.props.tableClassName} style={{tableLayout: 'fixed'}}>
				{this.renderHeader()}
			</table>
			<div className={scrollerClassName}>
				<table className={"virtual-header " + this.props.tableClassName} style={{tableLayout: 'fixed'}}>
					<TableBodyHeader
						model={this.props.model}
						actionColumnWidth={actionColumnWidth}
						onEvent={this.props.onEvent}/>
					<tbody>
						{this.renderBody()}
					</tbody>
					{this.renderFooter()}
				</table>
			</div>
		</div>;
	}
}

DataGrid.propTypes = {
	className: React.PropTypes.string,
	tableClassName: React.PropTypes.string,
	onEvent: React.PropTypes.func,
	onResize: React.PropTypes.func,
	scrollBarWidth: React.PropTypes.number.isRequired,
	actionColumnWidth: React.PropTypes.number.isRequired,
	model: React.PropTypes.shape({
		idColumn: React.PropTypes.string.isRequired,
		items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		selected: React.PropTypes.array.isRequired,
		edit: React.PropTypes.shape({
			buttons: React.PropTypes.object.isRequired,
			selected: React.PropTypes.array.isRequired
		}).isRequired,
		dataSources: React.PropTypes.object.isRequired,
		columns: React.PropTypes.object.isRequired,
		sort: React.PropTypes.shape({
			order: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
			columns: React.PropTypes.object.isRequired
		}).isRequired,
		filter: React.PropTypes.object.isRequired,
		headerActions: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.shape({
			header: React.PropTypes.bool,
			filterHeader: React.PropTypes.bool,
			footer: React.PropTypes.bool,
			title: React.PropTypes.bool,
			infiniteScroll: React.PropTypes.bool,
			editableColumns: React.PropTypes.bool
		}).isRequired,
		labels: React.PropTypes.shape({
			title: React.PropTypes.string,
			records: React.PropTypes.string,
			filter: React.PropTypes.string,
			itemsPerPage: React.PropTypes.string,
		}).isRequired,
		pager: React.PropTypes.shape({
			currentPageSize: React.PropTypes.number,
			currentPage: React.PropTypes.number,
			count: React.PropTypes.number
		}).isRequired,
		narrow: React.PropTypes.bool
	}).isRequired
};

export default DataGrid;