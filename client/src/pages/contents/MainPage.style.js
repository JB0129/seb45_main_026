import { styled } from 'styled-components';
import { PageContainer } from '../../atoms/layouts/PageContainer';
import teaching from '../../assets/images/unsplashs/teaching.png'
import tokens from '../../styles/tokens.json'

const globalTokens = tokens.global;

export const MainPageContainer = styled(PageContainer)`
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100vw;
    height: 100vh;
`
export const LightContainer = styled.div`
    background-color: ${(props)=>props.isDark ? globalTokens.Black.value : globalTokens.LightGray.value};
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 300ms;
`
export const DarkContainer = styled.div`
    background-color: ${(props)=>props.isDark ? globalTokens.DarkGray.value :globalTokens.Gray.value};
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 300ms;
`
export const FirstPageBackgroundContainer = styled.div`
    background-image: url(${teaching});
    background-size: cover;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`