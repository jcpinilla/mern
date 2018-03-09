import React from "react";

export default class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: ""
		};
		this.handleTagChange = this.handleTagChange.bind(this);
		this.submitTag = this.submitTag.bind(this);
	}

	handleTagChange(e) {
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
				<input type="text" placeholder="Enter the tag" value={this.state.tag} onChange={this.handleTagChange} />
				<button type="button" onClick={this.submitTag}>Ok</button>
			</div>
		);
	}
}