import React, {Component} from 'react'
import Notification from './Notification'
import ConnectionList from '../connections/ConnectionList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import User from '../profile/UserProfile'

class Dashboard extends Component{
    render(){
        const conn_list = [];
        const {profiles, auth, current_user} = this.props;
        if(!auth.uid) return<Redirect to='/login' />
        
        profiles && profiles.map(user=>{
            if(current_user.conn != null){
                for(var i = 0; i< current_user.conn.length; i++){
                    if(current_user.conn[i] === user.id){
                        conn_list.push(user);
                    }
                }
            }
        })
        return(
            <div className="themed-container " fluid="md">
                <div className="dashboard container">
                    <div className ="row">
                        <div className="col s12 m6">
                            <ConnectionList profiles= {conn_list}/>   {/* Display the list of connection the user has */}
                        </div>
                        <div className="col s12 m5 offset-m1">
                            <Notification />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
    return{
        profiles: state.firestore.ordered.user, // get the  list of user from the
        auth: state.firebase.auth,
        current_user:state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(Dashboard)