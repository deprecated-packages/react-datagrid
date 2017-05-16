import React from "react";
import PropTypes from "prop-types";
import autobind from "./autobind";
import {GOTO_PAGE, NEXT_PAGE, PREV_PAGE} from "./actions";

class TablePager extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	onPrevPageClick() {
		if (this.props.model.pager.currentPage > 1) {
			this.props.onEvent({eventName: PREV_PAGE});
		}
	}

	onNextPageClick() {
		if (this.props.model.pager.currentPage < this._getNumberOfPages()) {
			this.props.onEvent({eventName: NEXT_PAGE});
		}
	}

	onPageClick(pageNumber) {
		this.props.onEvent({eventName: GOTO_PAGE, pageNumber: pageNumber});
	}

	renderPageButton(pageNumber) {
		let className = "btn btn-default btn-xs";
		if (pageNumber === this.props.model.pager.currentPage) {
			className += " active";
		}
		return <button key={pageNumber} onClick={this.onPageClick.bind(this, pageNumber)} className={className}>
			{pageNumber}
		</button>;
	}

	_getNumberOfPages() {
		return Math.ceil(this.props.model.pager.count / this.props.model.pager.currentPageSize);
	}

	renderPageButtons() {
		let numberOfPages = this._getNumberOfPages();
		let MAX_PAGE = numberOfPages < 5 ? numberOfPages : 5;
		let currentPage = this.props.model.pager.currentPage;
		let buttons = [], to = 1, from = 1;
		if (currentPage <= MAX_PAGE) {
			from = 1;
			to = MAX_PAGE;
		} else if (currentPage > numberOfPages - 2) {
			from = numberOfPages - 4;
			to = numberOfPages;
		} else if (currentPage > 3 && currentPage < numberOfPages - 1) {
			from = currentPage - 2;
			to = currentPage + 2;
		}
		for (let i = from; i <= to; i++) {
			buttons.push(this.renderPageButton(i));
		}
		return buttons;
	}

	render() {
		return <span className="table-pager">
			<button className="btn btn-default btn-xs" onClick={this.onPrevPageClick}><i
				className={this.props.model.icons.prevIcon}/>
			</button>
			{" "}
			<span className="btn-group">
				{this.renderPageButtons()}
			</span>
			{" "}
			<button className="btn btn-default btn-xs" onClick={this.onNextPageClick}><i
				className={this.props.model.icons.nextIcon}/>
			</button>
		</span>;
	}
}

TablePager.propTypes = {
	onEvent: PropTypes.func,
	model: PropTypes.shape({
		icons: PropTypes.object.isRequired,
		pager: PropTypes.shape({
			count: PropTypes.number.isRequired,
			currentPageSize: PropTypes.number.isRequired,
			currentPage: PropTypes.number.isRequired
		}).isRequired
	})
};

export default TablePager;