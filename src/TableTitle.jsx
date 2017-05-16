import React from "react";
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
	model: React.PropTypes.shape({
		labels: React.PropTypes.shape({
			title: React.PropTypes.string
		}),
		settings: React.PropTypes.shape({
			title: React.PropTypes.bool
		})
	}),
	onEvent: React.PropTypes.func
};

export default TableTitle;