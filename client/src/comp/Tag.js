import React from "react";

export default class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.submitTag = this.submitTag.bind(this);
	}

	submitTag(e) {
		let tag = e.target.value;
		if (e.key === "Enter" && tag !== "") {
			this.props.submitTag(tag);
			e.target.value = "";
		}
	}

	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">#</span>
				</div>
				<input
					className="form-control"
					type="text"
					placeholder="Search for a tag"
					onKeyPress={this.submitTag} />
			</div>
		);
	}
}