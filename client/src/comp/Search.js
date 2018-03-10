import React from "react";

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.submitTag(this.props.tag);
	}

	render() {
		return (
			<li
				id="search-tag"
				className="list-group-item list-group-item-action"
				onClick={this.handleClick}>{this.props.tag}
			</li>
		);
	}
}