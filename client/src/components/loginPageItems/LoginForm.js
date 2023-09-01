import React from 'react';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { 
    LoginFormContainer,
    LoginFormInputContainer,
    ErrorTextTypo,
    LoginButton,
} from './LoginForm.style';
import { loginService } from '../../services/authServices';
import { setToken } from '../../redux/createSlice/LoginInfoSlice';
import { useNavigate } from 'react-router-dom';
import LoginInputs from './LoginInputs';
import useConfirm from '../../hooks/useConfirm';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginFailConfirm = useConfirm('이메일, 비밀번호를 확인해 주세요.')
    const isDark = useSelector(state=>state.uiSetting.isDark);
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = await loginService(data);
        if(response.status==='success') {
            const authorization = response.authorization;
            const refresh = response.refresh;
            console.log(response)
            dispatch(setToken({
                authorization: authorization,
                refresh: refresh
            }));

            navigate('/lecture');
        } else {
            loginFailConfirm();
        }
    };

    return (
        <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
            <LoginFormInputContainer isDark={isDark}>
                <LoginInputs
                    width='250px'
                    type='text'
                    name='email'
                    placeholder='이메일을 입력해 주세요.'
                    register={register}
                    required={true}
                    pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/i}/>
                { errors.email && errors.email.type==='required' &&
                        <ErrorTextTypo isDark={isDark}>이메일을 입력해 주세요.</ErrorTextTypo> }
                { errors.email && errors.email.type==='pattern' &&
                        <ErrorTextTypo isDark={isDark}>올바르지 않은 이메일 형식입니다.</ErrorTextTypo> }
            </LoginFormInputContainer>
            <LoginFormInputContainer>
                <LoginInputs
                    width='250px'
                    type='password'
                    name='password'
                    placeholder='비밀번호를 입력해 주세요.'
                    register={register}
                    required={true}
                    maxLength={20}
                    minLength={9}
                    pattern={/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/} />
                { errors.password && errors.password.type==='required' && 
                        <ErrorTextTypo isDark={isDark}>비밀번호를 입력해 주세요.</ErrorTextTypo> }
                { errors.password && errors.password.type==='maxLength' && 
                        <ErrorTextTypo isDark={isDark}>비밀번호는 20자 이하입니다.</ErrorTextTypo> }
                { errors.password && errors.password.type==='minLength' && 
                        <ErrorTextTypo isDark={isDark}>비밀번호는 9자 이상입니다.</ErrorTextTypo> }
                { errors.password && errors.password.type==='pattern' && 
                        <ErrorTextTypo isDark={isDark}>비밀번호는 영문자, 숫자, 특수기호를 포함합니다.</ErrorTextTypo> }
            </LoginFormInputContainer>
            
            <LoginButton isDark={isDark} type="submit">로그인</LoginButton>
        </LoginFormContainer>
    );
};

export default LoginForm;