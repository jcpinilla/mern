import React from "react";

export default class Counter extends React.Component {
	render() {
		return (
			<div>
				<p>#{this.props.tag}: {this.props.count}</p>
			</div>
		);
	}
}