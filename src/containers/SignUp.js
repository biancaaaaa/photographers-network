import React, { Component } from 'react';
import fire from '../config/Fire';
import {SingUpView} from '../components/SignUpView';

export default class SignUp extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		type: this.props.match.params.type || "photographer",
		location: "",
	};
	database = fire.database().ref();
	
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	
	signup = (e) => {
		e.preventDefault();
		const { name, email, password, password2, type, location } = this.state;
		if (password === password2) {
			fire.auth().createUserWithEmailAndPassword(email, password)
				.then((snap) => {
					let user = snap.user;
					user.updateProfile({
						displayName: name,
						photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
					});
					
					this.database.child(type).child(user.uid).set({
						email: user.email,
						location: location
					})
						.then(() => {
							this.database.child("locations").child(location).child(type).child(user.uid).set({
								displayName: name,
								photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
							});
						})
						.then(() => {
							this.database.child("users").child(user.uid).set({
								type: type,
								email: user.email,
								displayName: name,
								photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
							});

						})
						.then(() => {
							this.props.history.replace('/dashboard');
						})
						.catch((err) => console.log(err));
				})
				.catch((error) => {
					console.log(error);
				})
		}
	};

	optionSelectHandler = (type) => {
		this.setState({
			type: type,
		})
	};

	showCustomSelectHandler = () => {
		this.setState(
			prevState => ({
				showCustomSelect: !prevState.showCustomSelect
			}),
			() => {
				if (this.state.showCustomSelect === true) {
					window.addEventListener("click", e => {
						if (!e.target.classList.contains("custom-select")) {
							this.setState({
								showCustomSelect: false
							});
						}
					});
				}
			}
		);
	};

	render() {
		const { name, email, password, password2, location, type, showCustomSelect } = this.state;
		return (
			<SingUpView signupHandler={this.signup} name={name} changeHandler={this.handleChange} email={email}
				password={password} password2={password2} location={location} showCustomSelectHandler={this.showCustomSelectHandler}
				optionSelectHandler={this.optionSelectHandler} type={type} showCustomSelect={showCustomSelect}
			/>
		)
	}
}
