import React from "react";
import Post from "./Post";

export default class Posts extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					{
						this.props.posts.map(post =>
							<div className="col-sm-6">
								<Post post={post.node}	/>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}