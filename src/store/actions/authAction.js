export const login = (credentials) => {
    return (dispatch,getState,{firebase}) => {

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type:'LOGIN_SUCCESS'});
        }).catch((err) =>{
            dispatch({type:'LOGIN_FAILED',err});
        });
    }
}

export const logout = () => {
    return (dispatch,getState, {firebase}) =>{
        
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'});
        });
    }
}