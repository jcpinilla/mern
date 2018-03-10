import React from "react";
import Search from "./Search";

export default class History extends React.Component {
	render() {
		return (
			<div>
				<p><strong>Users have searched:</strong></p>
				<ul className="list-group">
					{
						this.props.history
							.sort((s1, s2) => s2.time - s1.time)
							.slice(0, 10)
							.map(search =>
								<Search
									key={search.time}
									tag={search.tag} 
									submitTag={this.props.submitTag}/>
							)
					}
				</ul>
			</div>
		);
	}
}