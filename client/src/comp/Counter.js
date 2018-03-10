import React from "react";
import MaxTag from "./MaxTag";

export default class Counter extends React.Component {
	render() {
		return (
			<div>
				<h5>Most frequent tags for <em>#{this.props.tag}</em></h5>
				{
					this.props.maxTags.map(tag => 
						<MaxTag
							maxTag={tag.tagName}
							count={tag.count}
							submitTag={this.props.submitTag} />
					)
				}
			</div>
		);
	}
}