import React from "react";

export default class Contador extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.tag}: {this.props.contador}</p>
			</div>
		);
	}
}