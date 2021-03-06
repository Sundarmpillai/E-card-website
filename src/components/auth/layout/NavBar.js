import React, { Profiler } from 'react'
import {Link} from 'react-router-dom'
import LoggedInLink from './LoggedInLink'
import LoggedOutLink from './LoggedOutLink'
import {connect} from 'react-redux'

const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <LoggedInLink profile={profile}/> : <LoggedOutLink/>
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">E-Card</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        profile:state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)