import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ( { history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user
    }));

    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key:name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { userId, password, passwordConfirm, username, emailAddress, birthday, homeAddress, phoneNumber, cellphoneNumber } = form;
        if ([userId, password, passwordConfirm, username, emailAddress, birthday, homeAddress, phoneNumber, cellphoneNumber].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }

        //비밀번호 확인 틀릴 시
        if (password !== passwordConfirm){
            setError('비밀번호가 일치하지 않습니다.');
            changeField({ form: 'register', key: 'password', value: ''});
            changeField({ form: 'register', key: 'passwordConfirm', value: ''});
            return;
        }
        dispatch(register({ userId, password, username, emailAddress, birthday, homeAddress, phoneNumber, cellphoneNumber }));
    };

    //컴포넌트 처음 렌더링 시 form 초기화
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // 회원가입 성공/실패 처리
    useEffect(() => {
        if (authError){
            if(authError.response.status === 409) {
                setError('이미 존재하는 계정입니다.');
                return;
            }
            //기타 이유
            setError('회원가입 실패');
            return;
        }
        if (auth){
            console.log('회원가입 성공');
            // console.log('auth');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if (user.user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e) {
                console.log('localStroage is not working..');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        /> 
    );
};

export default withRouter(RegisterForm);