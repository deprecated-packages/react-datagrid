import React from "react";
import PropTypes from "prop-types";
import autobind from "./autobind";

class TableTitle extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	render() {
		if (this.props.model.settings.title) {
			return <div className="title" onClick={this.onRowClick}>
				{this.props.model.labels.title}
			</div>;
		} else {
			return null;
		}
	}
}

TableTitle.propTypes = {
	model: PropTypes.shape({
		labels: PropTypes.shape({
			title: PropTypes.string
		}),
		settings: PropTypes.shape({
			title: PropTypes.bool
		})
	}),
	onEvent: PropTypes.func
};

export default TableTitle;