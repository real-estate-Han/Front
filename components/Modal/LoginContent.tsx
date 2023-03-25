import React from 'react';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER } from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
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
  const closeLogin = useStore((state) => state.changeLoginState);
  const [LoginQuery, { data: loginData, error }] = useLazyQuery(GET_USER);
  const LoginAPI = async (data: LoginContentType) => {
    await LoginQuery({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    if (loginData) {
      localStorage.setItem('token', loginData.login.token);
      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        showConfirmButton: false,
        timer: 1500,
      });
      closeLogin();
    }
    if (error) {
      console.log(error.message);
      //   setError('email', error);
    }
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(LoginAPI)}>
        <Inputs text="이메일" {...register('email')} />
        <span>{errors.email?.message}</span>
        <Inputs text="비밀번호" type="password" {...register('password')} />
        <span>{errors.password?.message}</span>
        <button type="submit">로그인</button>
      </form>
      <p>회원가입</p>
    </div>
  );
};

export default LoginContent;
