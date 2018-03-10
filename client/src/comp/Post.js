import React from "react";

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currLikes: 0,
			currComments: 0
		};
	}

	componentDidMount() {
		this.startInterval();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			clearInterval(window.interval);
			this.setState({
				currLikes: 0,
				currComments: 0,
				randomTag: ""
			}, () => {
				this.startInterval();
			});
		}
	}

	startInterval() {
		window.interval = setInterval(() => {
			let currLikes = this.state.currLikes;
			let currComments = this.state.currComments;
			let post = this.props.post;
			let likes = post.edge_liked_by.count;
			let comments = post.edge_media_to_comment.count;
			let text = post
				.edge_media_to_caption
				.edges[0]
				.node
				.text;
			let textTags = [];
			for (let w of text.split(" ")) {
				if (w.startsWith("#") && w.length < 15) {
					textTags.push(w.substring(1));
				}
			}
			let changed = false;
			if (currLikes !== likes) {
				currLikes++;
				changed = true;
			}
			if (currComments !== comments) {
				currComments++;
				changed = true;
			}
			if (changed) {
				let randomIndex = Math.floor(Math.random() * textTags.length);
				let randomTag = "Random tag: #" + textTags[randomIndex];
				if (textTags.length === 0) {
					randomTag = "No tags in text";
				}
				this.setState({
					currLikes,
					currComments,
					randomTag
				});
			} else {
				clearInterval(window.interval);
			}
		}, 150);
	}

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
		return (
			<div className="card mx-auto">
				<img className="card-img-top rounded" src={imageUrl} alt={text} />
				<div className="card-body">
					<p><strong>Likes:</strong> {this.state.currLikes}</p>
					<p><strong>Comments:</strong> {this.state.currComments}</p>
					<p><em>{this.state.randomTag}</em></p>
				</div>
			</div>
		);
	}
}