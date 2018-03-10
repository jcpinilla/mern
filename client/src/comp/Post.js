import React from "react";

export default class Post extends React.Component {
	render() {
		let post = this.props.post;
		let text = post
			.edge_media_to_caption
			.edges[0]
			.node
			.text;
		let imageUrl = post
			.thumbnail_resources[2]
			.src;
		let likes = post.edge_liked_by.count;
		let comments = post.edge_media_to_comment.count;
		return (
			<div className="card mx-auto">
				<img className="card-img-top rounded" src={imageUrl} alt={text} />
				<div className="card-body">
					<p>Likes: {likes}</p>
					<p>Comments: {comments}</p>
				</div>
			</div>
		);
	}
}