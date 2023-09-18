import axios from "axios";
import { useEffect } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import tokens from "../../../styles/tokens.json";
import { useToken } from "../../../hooks/useToken";
import { setCarts } from "../../../redux/createSlice/CartsSlice";
import { PageContainer } from "../../../atoms/layouts/PageContainer";
import { HomeTitle } from "../../../components/contentListItems/ChannelHome";
import { setIsLoading } from "../../../redux/createSlice/UISettingSlice";
import { useNavigate } from "react-router-dom";

const globalTokens = tokens.global;

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useToken();
  const isDark = useSelector((state) => state.uiSetting.isDark);
  const token = useSelector((state) => state.loginInfo.accessToken);
  const checkedItems = useSelector((state) => state.cartSlice.checkedItem);

  const getCartsData = () => {
    return axios
      .get(`https://api.itprometheus.net/members/carts`, {
        headers: { Authorization: token.authorization },
      })
      .then((res) => {
        dispatch(setCarts(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.response.data?.code === 401) {
          refreshToken(() => getCartsData());
        } else {
          console.log(err);
        }
      });
  };

  const postOrders = (orderData) => {
    return axios
      .get(
        `https://api.itprometheus.net/orders/success?order-id=${orderData.orderId}&payment-key=${orderData.paymentKey}&amount=${orderData.amount}`,
        {
          headers: { Authorization: token.authorization },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("성공적으로 결제가 완료되었습니다.");
        if (window.confirm("구매한 목록 페이지로 가시겠습니까?")) {
          navigate(`/purchased`);
        } else {
          navigate(`/lecture`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartsData();
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const amount = url.searchParams.get("amount");
    const paymentKey = url.searchParams.get("paymentKey");
    const orderData = { paymentKey, orderId, amount };
    if (paymentKey) {
      postOrders(orderData);
    }
  }, [checkedItems]);

  return (
    <PageContainer isDark={isDark}>
      <CartContainer>
        <CartTitle isDark={isDark}>수강 바구니</CartTitle>
        <CartContent>
          <CartLeft />
          <CartRight />
        </CartContent>
      </CartContainer>
    </PageContainer>
  );
};

export default CartPage;

// const globalTokens = tokens.global;

export const CartContainer = styled.div`
  width: 100%;
  max-width: 1170px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: ${globalTokens.Spacing40.value}px 0px;
`;

export const CartTitle = styled(HomeTitle)``;

export const CartContent = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  /* place-items: center; */
  flex-wrap: wrap;

  @media screen and (min-width: 0px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 1170px) {
    grid-template-columns: 790px 350px;
    grid-column-gap: 30px;
  }
`;
