import React from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { GET_USER } from '@utils/apollo/gqls';
import useStore from '@zustand/store';

export interface LoginContentType {
  email: string;
  password: string;
}

const LoginContent = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginContentType>();
  const closeLogin = useStore(state => state.changeLoginState);
  const switchLogin = useStore(state => state.switchLoginSignUp);
  const setSideMemu = useStore(state => state.setSideMenu);
  const [LoginQuery, { data: loginData, error, loading }] = useLazyQuery(
    GET_USER,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache',
    },
  );

  const { changeLikeState } = useStore(state => state);

  const LoginAPI = async (data: LoginContentType) => {
    await LoginQuery({
      variables: {
        email: data.email,
        password: data.password,
      },
      fetchPolicy: 'network-only',
    }).then(async res => {
      res.error &&
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: res.error.message,
        });
      if (!res.error) {
        localStorage.setItem('token', res.data.login.token);
        localStorage.setItem('userId', res.data.login.userId);
        localStorage.setItem('userName', res.data.login.userNickname);
        changeLikeState(res.data.login.likeposts);
        localStorage.setItem(
          'likeposts',
          JSON.stringify(res.data.login.likeposts),
        );
        localStorage.setItem(
          'mycontents',
          JSON.stringify(res.data.login.posts),
        );
        localStorage.setItem('userstatus', res.data.login.status);
        await Swal.fire({
          icon: 'success',
          title: '로그인 성공',
          showConfirmButton: false,
          timer: 1500,
        });
        closeLogin();
        // setSideMemu();
      }
    });
  };
  return (
    <Wrap>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(LoginAPI)}>
        <Inputs text="이메일" {...register('email')} width="90%" />
        <span>{errors.email?.message}</span>
        <Inputs
          text="비밀번호"
          type="password"
          {...register('password')}
          width="90%"
        />
        <span>{errors.password?.message}</span>

        <LoginButton type="submit" disabled={loading}>
          로그인
        </LoginButton>
      </form>
      <SwitchButton onClick={switchLogin}>회원가입</SwitchButton>
    </Wrap>
  );
};

export default LoginContent;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 10px;
  /* border : 1px solid black; */
`;
const LoginButton = styled.button`
  width: 50%;
  height: 30px;
  border-radius: 10px;
  display: block;
  margin: 10px auto;
  border: none;
  background-color: ${({ theme, disabled }) =>
    disabled ? '#f5f5f5f' : `${theme.mainColor.blue500}`};
  color: ${({ disabled }) => (disabled ? 'darkgray' : `white`)};
`;

const SwitchButton = styled.span`
  height: 20px;
  display: block;
  margin: 10px auto;
  /* border: 1px solid black; */
`;
