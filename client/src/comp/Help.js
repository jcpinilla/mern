import React from "react";

export default class Help extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showHelp: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let showHelp = this.state.showHelp;
		this.setState({
			showHelp: !showHelp
		});
	}

	render() {
		return (
			<div className="row">
				<div className="col-lg-10">
					{
						this.state.showHelp &&
						<div className="alert alert-info alert-dismissible show fade">
							<button type="button" class="close" onClick={this.handleClick}>&times;</button>
							<strong>Surf</strong> Instagram! Search for a tag, select it 	 from <em>Users have searched</em> or
							click on the most frequent tag (if it's currently displayed)
						</div>
					}
				</div>
				<div className="col-lg-2">
					<button
						onClick={this.handleClick}
						className="btn"
						type="button">
						Help
					</button> 
				</div>
			</div>
		);
	}
}