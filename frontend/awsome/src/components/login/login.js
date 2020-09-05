import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../layout/AdminLayout/Breadcrumb";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null ,
            password: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        
        this.setState({
            [name] : value
        })
    }

    handleSubmit = () => {
        fetch("/api_token", {
            method: 'GET',
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Basic ${btoa(`${this.state.username}:${this.state.password}`)}`
            },
        }).then((response => {
            console.log(response.status)
            if (response.status == 200) {
                sessionStorage.setItem("token", response.json().token)
                window.location.href="/detailsForm"
            } else {
                alert("Your username has been taken")
            }
        }))
    }

    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="text" name="username" onChange={this.handleInputChange} className="form-control" placeholder="Username"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" name="password" onChange={this.handleInputChange} className="form-control" placeholder="Password"/>
                                </div>
                                <Link to="/detailsForm" >
                                    <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleSubmit}>Login</button>
                                </Link>
                                {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p> */}
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/register">Register</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Login;

