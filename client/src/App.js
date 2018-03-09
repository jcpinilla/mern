import React from "react";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usuarios: []
		};
	}

	componentDidMount() {
		fetch("api/usuarios")
			.then(res => res.json())
			.then(data => this.setState({usuarios: data}));
	}

	render() {
		return (
			<ul>
				{
					this.state.usuarios.map(usuario => 
						<li>{usuario.nombre}</li>
					)
				}
			</ul>
		);
	}
}