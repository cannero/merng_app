import React from 'react';
import useToken from '../util/LoginUser';

function Login(){
    useToken();
    return (
        <div>
            <h1>Login Page</h1>
        </div>
    )
}

export default Login;