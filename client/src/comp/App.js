import React from "react";
import Tag from "./Tag";
import Counter from "./Counter";
import History from "./History";
import Posts from "./Posts";
import Help from "./Help";

import "../styles/app.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tag: "",
			maxTags: [],
			posts: [],
			history: []
		};
		this.submitTag = this.submitTag.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
	}

	handleTagChange(e) {
		this.setState({
			tag: e.target.value
		});
	}

	componentDidMount() {
		this.updateHistory();
	}

	updateHistory() {
		fetch("/api/tags")
			.then(res => res.json())
			.then(data => this.setState({history: data}));
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
		fetch("/api/tags", {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({tag})
		})
			.then(() => this.updateHistory());
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
		let maxTags = [];
		for (let i = 0; i < 5; i++) {
			let maxTag = "";
			let maxCount = 0;
			for (let tag in tagCount) {
				if (tag !== searchTag && tagCount[tag] > maxCount) {
					maxTag = tag;
					maxCount = tagCount[tag];
				}
			}
			maxTags.push({
				tagName: maxTag,
				count: maxCount
			});
			delete tagCount[maxTag];
		}
		this.setState({
			tag: searchTag,
			maxTags,
			posts
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Tag 
							submitTag={this.submitTag}
							tag={this.state.tag}
							handleTagChange={this.handleTagChange} /><br />
						<History
							history={this.state.history}
							submitTag={this.submitTag} /><br />
					</div>
					<div className="col-lg-9">
						<Help /><br />
						{
							this.state.maxTags.length !==0 &&
							<div>
								<Counter
									tag={this.state.tag}
									maxTags={this.state.maxTags}
									submitTag={this.submitTag} /><br />
								<Posts posts={this.state.posts}/>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}