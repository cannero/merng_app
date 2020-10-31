import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';

import { AuthContext } from '../context/auth';

function useToken(props) {
    const context = useContext(AuthContext);
    const [loginUser, { loading }] = useMutation(LOGIN_USER,
        {
            update(proxy, result) {
                console.log("result is", result);
                context.login(result.data.login);
                props.history.push('/');
            },
            onError(err) {
                console.log(err);
            },
            variables: { username: 'user3', password: 'pwd1' }
        });
    if (!loading) {
        loginUser();
    }
    return loading;
};

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username, password: $password
            ){
                id
                username
                createdAt
                token
            }
    }
`;

export default useToken;