import React from "react";

export default class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			invalid: false
		};
		this.submitTag = this.submitTag.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	submitTag(e) {
		let tag = e.target.value;
		if (e.key === "Enter") {
			if (!(/^\w{1,30}$/i.test(tag))) {
				this.setState({
					invalid: true
				});
			} else {
				this.props.submitTag(tag);
				e.target.value = "";
			}
		}
	}

	handleOnChange() {
		this.setState({
			invalid: false
		});
	}

	render() {
		return (
			<div>
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text">#</span>
					</div>
					<input
						className="form-control"
						type="text"
						placeholder="Search for a tag"
						onChange={this.handleOnChange}
						onKeyPress={this.submitTag} />
				</div>
				{
					this.state.invalid &&
					<div className="alert alert-danger">Invalid tag</div>
				}
			</div>
		);
	}
}