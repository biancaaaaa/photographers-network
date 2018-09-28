import React, {Component} from 'react';
import fire from '../config/Fire';
import {Link, withRouter} from 'react-router-dom';
import {EmailSVG} from '../components/svg/EmailSVG';
import {PasswordSVG} from "../components/svg/PasswordSVG";
import {Error} from "../components/Error";
import {InputField} from "../components/InputField";

class Login extends Component {
    state = {
        email: '',
        password: '',
        type: 'photographer',
        errorMessage: '',
        error: false
    };
    database = fire.database().ref();

    /**
     * Updates state to the current value of a certain target.
     * @param e
     */
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    /**
     * Logs in user. Doesn't log in user, if he's no photographer/company.
     *
     * @param e
     */
    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/dashboard');
                /*
                let user = result.user;
                let userIsType = false;
                this.database.child(this.state.type).once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        // checks, if user exists in the node of the certain type e.g. photographer
                        if (childSnapshot.key === user.uid) userIsType = true;
                    });
                }).then(() => {
                    if (!userIsType) {
                        fire.auth().signOut();
                        this.setState({error: true, errorMessage: `You are not registered as ${this.state.type}!`});
                    } else {
                        this.props.history.push('/dashboard');
                    }
                });*/
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <div className="section-content">
                    <form onSubmit={this.login}>
                        <h1>Login</h1>
                        <InputField wrapperClass="gb-input-wrapper" svg={<EmailSVG classes="gb-input-icon-left"/>}
                                    value={this.state.email} changeHandler={this.handleChange} type="email" name="email"
                                    placeholder="Enter email"/>
                        <InputField wrapperClass="gb-input-wrapper" svg={<PasswordSVG classes="gb-input-icon-left"/>}
                                    value={this.state.password} changeHandler={this.handleChange} type="password"
                                    name="password"
                                    placeholder="Password"/>
                        <div className="btn-container">
                            <input type="submit" className="gb-btn gb-btn-medium gb-btn-primary" value="Login"/>
                            <Link to="/register" className="gb-btn gb-btn-medium gb-btn-primary">Register...</Link>
                        </div>
                        {this.state.error && <Error message={this.state.errorMessage}/>}
                    </form>
                </div>
            </div>
        );
    }
}

export const LogInWithRouter = withRouter(Login);