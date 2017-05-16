import React from "react";
import autobind from "./autobind";
import {SET_PAGE_SIZE} from "./actions";

class TablePagerPageSize extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	onSetPage(pageSize, e) {
		//To supress the hash click
		e.preventDefault();
		e.stopPropagation();
		this.props.onEvent({eventName: SET_PAGE_SIZE, pageSize: pageSize});
	}

	renderLabel() {
		if (this.props.model.narrow) {
			return null;
		} else {
			return this.props.model.labels.itemsPerPage;
		}
	}

	render() {
		let label = this.renderLabel();
		return <span className="dropdown">
			<button className="btn btn-default btn-xs dropdown-toggle"
				type="button"
				id="dropdownMenu1"
				data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="true">
				{this.props.model.pager.currentPageSize}{" "}{label}{" "}
				<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				<li><a href="#" onClick={this.onSetPage.bind(this, 5)}>5 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#"
					onClick={this.onSetPage.bind(this, 10)}>10 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#"
					onClick={this.onSetPage.bind(this, 15)}>15 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#"
					onClick={this.onSetPage.bind(this, 30)}>30 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#"
					onClick={this.onSetPage.bind(this, 50)}>50 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#"
					onClick={this.onSetPage.bind(this, 75)}>75 {this.props.model.labels.itemsPerPage}</a></li>
				<li><a href="#" onClick={this.onSetPage.bind(this, 100)}>100 {this.props.model.labels.itemsPerPage}</a></li>
			</ul>
		</span>;
	}
}

TablePagerPageSize.propTypes = {
	onEvent: React.PropTypes.func,
	model: React.PropTypes.shape({
		pager: React.PropTypes.shape({
			currentPageSize: React.PropTypes.number.isRequired
		}).isRequired,
		labels: React.PropTypes.object.isRequired,
		narrow: React.PropTypes.bool.isRequired
	}).isRequired
};

export default TablePagerPageSize;