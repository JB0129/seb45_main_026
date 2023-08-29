import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBrowserWidth } from './redux/createSlice/UISettingSlice';
import MainPage from './pages/contents/MainPage';
import LoginPage from './pages/auth/LoginPage';
import MyProfilePage from './pages/userInfo/MyProfilePage';
import Header from './components/headers/Header';
import Footer from './components/footers/Footer';
import ChannelPage from './pages/contents/ChannelPage';

function App() {
  const dispatch = useDispatch();
  const isDark = useSelector(state=>state.uiSetting.isDark);
  const browserWidth = useSelector(state=>state.uiSetting.browserWidth);
  
  const handleResize = () => {
      dispatch(setBrowserWidth(window.innerWidth));
  }

  useMemo(()=>{
    window.addEventListener('resize',handleResize);
  },[]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/MyProfile" element={<MyProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
