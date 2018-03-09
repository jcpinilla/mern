import React from "react";
import Tag from "./Tag";
import Contador from "./Contador";
import Post from "./Post";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: "",
			topTag: "",
			tags: {},
			posts: []
		};
		this.submitTag = this.submitTag.bind(this);
		this.agregarTag = this.agregarTag.bind(this);
	}

	submitTag(tag) {
		fetch(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
			.then(res => res.json())
			.then(data => {
				let posts = data
					.graphql
					.hashtag
					.edge_hashtag_to_top_posts
					.edges;
				this.setState({
					posts
				});
			});
	}

	agregarTag(tag) {
		let tags = this.state.tags;
		if(!(tag in tags)) {
			tags.tag = 0;
		}
		tags.tag += 1;
		this.setState({
			tags
		});
	}

	render() {
		let tags = this.state.tags;
		let max = 0;
		let maxTag = "";
		for(let tag in tags) {
			if (tags[tag] > max) {
				maxTag = tag;
				max = tags[tag];
			}
		}
		return (
			<div>
				<Tag 
					submitTag={this.submitTag} />
				<Contador
					tag={maxTag}
					contador={max} />
				{
					this.state.posts.map(post => 
						<Post
							agregarTag={this.agregarTag}
							post={post} />
					)
				}
			</div>
		);
	}
}