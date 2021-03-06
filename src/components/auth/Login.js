import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        email : '',
        password: ''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state);
    }
    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className = "grey-text text-darken-3">Login</h5>
                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "email" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handelChange}/>
                    </div>
                    <div className="input-filed">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        login: (creds) => dispatch(login(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
