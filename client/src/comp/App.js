import React from "react";
import Tag from "./Tag";
import Counter from "./Counter";
import Post from "./Post";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			maxTag: "",
			maxCount: 0,
			posts: []
		};
		this.submitTag = this.submitTag.bind(this);
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
				this.process(tag, posts);
			});
	}

	process(searchTag, posts) {
		let tagCount = {};
		posts
			.map(post =>
				post
					.node
					.edge_media_to_caption
					.edges[0]
					.node
					.text
			).map(text => {
				let textTags = [];
				for (let w of text.split(" ")) {
					if (w.startsWith("#")) {
						textTags.push(w.substring(1));
					}
				}
				return textTags;
			}).forEach(tags => {
				for (let tag of tags) {
					if (!(tag in tagCount)) {
						tagCount[tag] = 0;
					}
					tagCount[tag] += 1;
				}
			});
		let maxTag = "";
		let maxCount = 0;
		for (let tag in tagCount) {
			if (tag !== searchTag && tagCount[tag] > maxCount) {
				maxTag = tag;
				maxCount = tagCount[tag];
			}
		}
		this.setState({
			maxTag,
			maxCount,
			posts
		});
	}

	render() {
		return (
			<div>
				<Tag 
					submitTag={this.submitTag} />
				{
					this.state.maxTag !== "" &&
					<div>
						<Counter
							tag={this.state.maxTag}
							count={this.state.maxCount} />
						{
							this.state.posts.map(post =>
								<Post
									post={post}	/>
							)
						}
					</div>
				}
			</div>
		);
	}
}