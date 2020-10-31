import React, {createContext, useReducer} from 'react';

const initialState = {
    user: null
};

const AuthContext = createContext({
    user: null,
    login: (userData) => {}
});

const authReducer = (state, action) =>{
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        console.log('logging in', userData.username);
        localStorage.setItem('jwtToken', userData.token);
        dispatch({type: 'LOGIN', payload: userData});
    };
    return (
        <AuthContext.Provider value={{user: state.user, login}}
        {...props}
        />
    )
}

export {
    AuthContext,
    AuthProvider
}