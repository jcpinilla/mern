import React from "react";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.submitTag(this.props.maxTag);
	}

	render() {
		return (
			<div>
				<h5>Most frequent tag for <em>#{this.props.tag}</em></h5>
				<h2 onClick={this.handleClick}>
					<span id="max-tag" className="display-3">#{this.props.maxTag} </span>
					<span className="badge badge-secondary">{this.props.count} time{this.props.count !== 1 && "s"}</span>
				</h2>
			</div>
		);
	}
}