import React from "react";

export default class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: ""
		};
		this.manejarCambioTag = this.manejarCambioTag.bind(this);
		this.submitTag = this.submitTag.bind(this);
	}

	manejarCambioTag(e) {
		this.setState({
			tag: e.target.value
		});
	}

	submitTag() {
		this.props.submitTag(this.state.tag);
	}

	render() {
		return (
			<div>
				<span># </span>
				<input type="text" placeholder="Enter the tag" value={this.state.tag} onChange={this.manejarCambioTag} />
				<button type="button" onClick={this.submitTag}>Ok</button>
			</div>
		);
	}
}