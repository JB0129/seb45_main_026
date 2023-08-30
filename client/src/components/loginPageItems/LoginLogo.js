import React from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logos/logo.png';
import lightLogo from '../../assets/images/logos/lightLogo.png'
import { Heading3Typo } from '../../atoms/typographys/Typographys';

export const LoginFormLogoContainer = styled.div`
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
`
export const LoginLogoTitle = styled(Heading3Typo)`
    position: absolute;
    top: 15px;
    left: 40px;
    z-index: 100;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    white-space: pre;
    font-family: 'Saira Semi Condensed', sans-serif;
`
export const LoginLogoImg = styled.img`
    position: absolute;
    top: 0;
    right: 25px;
    z-index: 99;
    width: 100px;
`
const LoginFormLogo = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);

    return (
        <LoginFormLogoContainer>
            <LoginLogoTitle isDark={isDark}>IT Prometheus</LoginLogoTitle>
            <LoginLogoImg src={isDark?lightLogo:logo}/>
        </LoginFormLogoContainer>
    );
};

export default LoginFormLogo;