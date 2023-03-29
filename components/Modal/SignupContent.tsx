import React from 'react';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
export interface LoginContentType {
  email: string;
  password: string;
  name: string;
  passwordconfirm: string;
}

const SignupContent = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginContentType>();
  const CREATE_USER = gql`
    mutation Mutation($userInput: UserInputData) {
      createUser(userInput: $userInput) {
        email
      }
    }
  `;
  const switchLogin = useStore(state => state.switchLoginSignUp);
  const [SignupMutate, { data: signupdata, error }] = useMutation(CREATE_USER);
  const SignupAPI = async (data: LoginContentType) => {
    await SignupMutate({
      variables: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
    if (signupdata) {
      await Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        showConfirmButton: false,
        timer: 1500,
      });
      switchLogin();
    }
    if (error) {
      console.log(error.message);
      //   setError('email', error);
    }
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(SignupAPI)}>
        <Inputs text="이메일" {...register('email')} />
        <span>{errors.email?.message}</span>
        <Inputs text="이름" type="password" {...register('name')} />
        <span>{errors.password?.message}</span>
        <Inputs text="비밀번호" type="password" {...register('password')} />
        <span>{errors.password?.message}</span>
        <Inputs
          text="비밀번호"
          type="password"
          {...register('passwordconfirm')}
        />
        <span>{errors.password?.message}</span>
        <button type="submit">회원가입</button>
      </form>
      <p onClick={switchLogin}>로그인 하러가기</p>
    </div>
  );
};

export default SignupContent;
