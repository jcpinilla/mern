import React from "react";

export default class MaxTag extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.submitTag(this.props.maxTag);
	}

	render() {
		return (
			<h2 onClick={this.handleClick}>
				<span id="max-tag" className="display-4">#{this.props.maxTag} </span>
				<span className="badge badge-secondary">{this.props.count} time{this.props.count !== 1 && "s"}</span>
			</h2>
		);
	}
}