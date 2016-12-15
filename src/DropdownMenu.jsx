import React from "react";
import autobind from "./autobind";
import {SELECT_MENU_ITEM} from "./actions";

class DropdownMenu extends React.Component {

	constructor(props) {
		super(props);
		autobind(this);
	}

	onClick(item, group, e) {
		e.preventDefault();
		e.stopPropagation();
		var event = {
			eventName: SELECT_MENU_ITEM,
			menuName: this.props.name,
			item: item,
			group: group
		};
		this.props.onEvent(event);
	}

	renderIcon(item) {
		if (this.props.selected.includes(item.name)) {
			if (item.type === 'checker') {
				return <i className="icon-check"/>;
			} else {
				return <i className="icon-circle"/>;
			}
		} else {
			if (item.type === 'checker') {
				return <i className="icon-check-empty"/>;
			} else {
				return <i className="icon-circle-blank"/>;
			}
		}
	}

	renderItem(group, item, uniqKey) {
		return <li key={uniqKey}>
			<a href="#" onClick={this.onClick.bind(this, item, group)}>
				{this.renderIcon(item)}
				{' '}
				{item.label}
			</a>
		</li>;
	}

	renderMenu() {
		if (this.props.groups) {
			var items = [];
			Object.keys(this.props.items).map(groupName => {
				let groupItems = this.props.items[groupName];
				items.push(groupItems.map(this.renderItem.bind(this, groupName)));
				items.push(<li role="separator" className="divider" key={groupName}/>);
			});
			items.pop();
			return items;
		} else {
			return this.props.items.map(this.renderItem.bind(this, 'nogroup'));
		}
	}

	renderIconOrLabel() {
		if (this.props.icon) {
			return <i className={this.props.icon} />;
		} else {
			return this.props.label;
		}
	}

	render() {
		let className = "dropdown";
		let menuClassName = "dropdown-menu";
		if (this.props.menuClassName) {
			menuClassName += " " + this.props.menuClassName;
		}
		if (this.props.className) {
			className += " " + this.props.className;
		}
		return <span className={className}>
			<button className="btn btn-default btn-xs dropdown-toggle"
				type="button"
				title={this.props.label}
				id={this.props.name}
				data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="true">
				{this.renderIconOrLabel()}{' '}
				<span className="caret"/>
			</button>
			<ul className={menuClassName} aria-labelledby={this.props.name}>
				{this.renderMenu()}
			</ul>
		</span>;
	}
}

DropdownMenu.propTypes = {
	name: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	icon: React.PropTypes.string,
	items: React.PropTypes.array.isRequired,
	menuClassName: React.PropTypes.string,
	className: React.PropTypes.string,
	onEvent: React.PropTypes.func.isRequired,
	groups: React.PropTypes.bool,
	selected: React.PropTypes.array.isRequired
};

export default DropdownMenu;