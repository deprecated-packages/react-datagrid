import React from "react";
import PropTypes from "prop-types";
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
		window.addEventListener("resize", this.onResize, true);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize, true);
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
				icons={this.props.model.icons}
			/>;
		} else {
			return <TableRow
				item={item}
				className={this.props.model.classNameFactories.row(item)}
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
		let className = "data-grid " + (this.props.className || "");
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
		return <div className={className} ref={(c) => {
			this._dataGridRootNode = c;
		}}>
			{this.renderTableTitle()}
			<table className={this.props.tableClassName} style={{tableLayout: "fixed"}}>
				{this.renderHeader()}
			</table>
			<div className={scrollerClassName}>
				<table className={"virtual-header " + this.props.tableClassName} style={{tableLayout: "fixed"}}>
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
	className: PropTypes.string,
	tableClassName: PropTypes.string,
	onEvent: PropTypes.func,
	onResize: PropTypes.func,
	scrollBarWidth: PropTypes.number.isRequired,
	actionColumnWidth: PropTypes.number.isRequired,
	model: PropTypes.shape({
		icons: PropTypes.any,
		idColumn: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		selected: PropTypes.array.isRequired,
		edit: PropTypes.shape({
			buttons: PropTypes.object.isRequired,
			selected: PropTypes.array.isRequired
		}).isRequired,
		dataSources: PropTypes.object.isRequired,
		columns: PropTypes.object.isRequired,
		sort: PropTypes.shape({
			order: PropTypes.arrayOf(PropTypes.string).isRequired,
			columns: PropTypes.object.isRequired
		}).isRequired,
		filter: PropTypes.object.isRequired,
		headerActions: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		settings: PropTypes.shape({
			header: PropTypes.bool,
			filterHeader: PropTypes.bool,
			footer: PropTypes.bool,
			title: PropTypes.bool,
			infiniteScroll: PropTypes.bool,
			editableColumns: PropTypes.bool
		}).isRequired,
		labels: PropTypes.shape({
			title: PropTypes.string,
			records: PropTypes.string,
			filter: PropTypes.string,
			itemsPerPage: PropTypes.string
		}).isRequired,
		pager: PropTypes.shape({
			currentPageSize: PropTypes.number,
			currentPage: PropTypes.number,
			count: PropTypes.number
		}).isRequired,
		narrow: PropTypes.bool,
		classNameFactories: PropTypes.shape({
			row: PropTypes.any.isRequired
		}).isRequired
	}).isRequired
};

export default DataGrid;