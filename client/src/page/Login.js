import React from 'react';
import Button from '../components/common/Button';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

class Login extends React.Component{
    handleClick = () => {
        console.log("login");
    }

    render(){
        return(
            <AuthTemplate>
                <AuthForm type="login" />
            </AuthTemplate>
        );
    };
};

export default Login;