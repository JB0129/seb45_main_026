import React from 'react';
import { useSelector } from 'react-redux';
import HeaderLogo from './HeaderLogo';
import { HeaderContainer, HeaderLoginButton, MainPageHeaderContainer } from './Header.style';
import { useNavigate } from 'react-router-dom';

export const MainPageHeader = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);
    const navigate = useNavigate();
    
    const handleLoginButtonClick = () => {
        navigate('/login');
    }
    return (
        <MainPageHeaderContainer isDark={isDark}>
            <HeaderLogo/>
            <HeaderLoginButton isDark={isDark} onClick={handleLoginButtonClick}>로그인</HeaderLoginButton>
        </MainPageHeaderContainer>
    );
}

export const Header = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        navigate('/login');
    }

    return (
        <HeaderContainer isDark={isDark}>
            <HeaderLogo/>
            <HeaderLoginButton isDark={isDark} onClick={handleLoginButtonClick}>로그인</HeaderLoginButton>
        </HeaderContainer>
    );
};

export default Header;