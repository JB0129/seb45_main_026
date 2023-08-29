import React from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import tokens from '../../styles/tokens.json'
import HeaderLogo from './HeaderLogo';

const globalTokens = tokens.global;

export const HeaderContainer = styled.header`
    height: 60px;
    background-color: ${(props)=>props.isDark ? globalTokens.Black.value : globalTokens.Header.value};
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 
        ${(props)=>props.isDark ? globalTokens.RegularWhiteShadow.value.x : globalTokens.RegularShadow.value.x}px 
        ${(props)=>props.isDark ? globalTokens.RegularWhiteShadow.value.y : globalTokens.RegularShadow.value.y}px 
        ${(props)=>props.isDark ? globalTokens.RegularWhiteShadow.value.blur : globalTokens.RegularShadow.value.blur}px 
        ${(props)=>props.isDark ? globalTokens.RegularWhiteShadow.value.spread : globalTokens.RegularShadow.value.spread}px 
        ${(props)=>props.isDark ? globalTokens.RegularWhiteShadow.value.color : globalTokens.RegularShadow.value.color };
    transition: 300ms;
`
export const MainPageHeaderContainer = styled(HeaderContainer)`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0);
    box-shadow: none;
`
export const MainPageHeader = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);

    return (
        <MainPageHeaderContainer isDark={isDark}>
            <HeaderLogo/>
        </MainPageHeaderContainer>
    );
}

export const Header = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);

    return (
        <HeaderContainer isDark={isDark}>
            <HeaderLogo/>
        </HeaderContainer>
    );
};

export default Header;