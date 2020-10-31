import React from 'react';
import useToken from '../util/LoginUser';

function Login(props){
    useToken(props);
    return (
        <div>
            <h1>Login Page</h1>
        </div>
    )
}

export default Login;