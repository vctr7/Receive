import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from './../lib/styles/palette';
import Button from './common/Button'


const AuthFormBlock = styled.div`
    h3{
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const MypageLOTTEForm = ({type, duty, onChange, onSubmit, error}) => {
    return(
        <AuthFormBlock>
            <hr></hr>
            <h4>롯데</h4>
            <form onSubmit={onSubmit}>
                <StyledInput 
                    autoComplete="LOTTE_id"
                    name="LOTTE_id" 
                    placeholder="아이디" 
                    onChange={onChange}
                    value={duty.LOTTE_id}
                />
                <StyledInput 
                    autoComplete="new-password" 
                    name="LOTTE_password" 
                    placeholder="비밀번호" 
                    type="password" 
                    onChange={onChange}
                    value={duty.LOTTE_password}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonWithMarginTop cyan={true} fullWidth={true} >
                    로그인
                </ButtonWithMarginTop>
            </form>
        </AuthFormBlock>
    );
};

export default MypageLOTTEForm;