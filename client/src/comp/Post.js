import React from "react";

export default class Post extends React.Component {
	render() {
		let post = this.props.post;
		let text = post
			.node
			.edge_media_to_caption
			.edges[0]
			.node
			.text;
		return (
			<p>{text}</p>
		);
	}
}