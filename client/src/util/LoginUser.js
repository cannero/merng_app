import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

function useToken(){
        console.log('calling useMut');
        const [loginUser, {loading}] = useMutation(LOGIN_USER, 
            {
                update(proxy, result){
                    console.log(result);
                },
                onError(err){
                    console.log(err.graphQLErrors[0]);
                },
                variables: {username: 'user3', password: 'pwd1'}});
        console.log(loginUser);
        if(!loading){
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