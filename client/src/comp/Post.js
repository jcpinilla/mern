import React from "react";

export default class Post extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		tags: []
	// 	};
	// }

	render() {
		let post = this.props.post;
		let texto = post
			.node
			.edge_media_to_caption
			.edges[0]
			.node
			.text;

		for(let w of texto.split(" ")) {
			if (w.startsWith("#")) {
				this.props.agregarTag(w.substring(1));
			}
		}
		return (
			// <ul>
			// 	{
			// 		this.props.tags.map(tag =>
			// 			<li>#{tag}</li>
			// 		)
			// 	}
			// </ul>
			<p>{texto}</p>
		);
	}
}