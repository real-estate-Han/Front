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
    mutation Mutation($UserInputData: UserInputData) {
      createUser(userInput: $UserInputData) {
        email
      }
    }
  `;
  const switchLogin = useStore(state => state.switchLoginSignUp);
  const [SignupMutate, { data: signupdata, error,loading }] = useMutation(CREATE_USER);
  const isEmailValid = (email:string) => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return emailRegex.test(email);
  }
  const SignupAPI = async (data: LoginContentType) => {
    if(!isEmailValid(data.email)){
      Swal.fire({
        icon: 'error',
        text: '이메일 형식이 올바르지 않습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if(data.password !== data.passwordconfirm){
      Swal.fire({
        icon: 'error',  
        text: '비밀번호가 일치하지 않습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    console.log(data);
    await SignupMutate({
      variables: { UserInputData : {
        email: data.email,
        password: data.password,
        name: data.name,
      }
      },
    }).then(res => {
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        showConfirmButton: false,
        timer: 1500,
      });
      switchLogin();
    }).catch(err => {
      Swal.fire({
        icon: 'error',  
        title: '회원가입 실패',
        text: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    // if (signupdata) {
    //   await Swal.fire({
    //     icon: 'success',
    //     title: '회원가입 성공',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   switchLogin();
    // }
    // if (error) {
    //   console.log(error.message);
    //   //   setError('email', error);
    // }
  };
  return (
    <Wrap>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(SignupAPI)}>
        <Inputs text="이메일" {...register('email')} />
        <span>{errors.email?.message}</span>
        <Inputs text="이름" type="text" {...register('name')} />
        <span>{errors.password?.message}</span>
        <Inputs text="비밀번호" type="password" {...register('password')} />
        <span>{errors.password?.message}</span>
        <Inputs
          text="비밀번호"
          type="password"
          {...register('passwordconfirm')}
        />
        <span>{errors.password?.message}</span>
        <LoginButton type="submit" disabled={loading}>회원가입</LoginButton>
      </form>
      <SwitchButton onClick={switchLogin}>로그인 하러가기</SwitchButton>
    </Wrap>
  );
};

export default SignupContent;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;;
  box-sizing: border-box;
  gap : 10px;
  /* border : 1px solid black; */
`
const LoginButton = styled.button`
  width: 50%;
  height: 30px;
  border-radius: 10px;
  display: block;
  margin : 10px auto;
  border : none;
  background-color: ${({theme,disabled})=>(disabled ? "#f5f5f5f" :`${theme.mainColor.blue500}`)};
  color :${({disabled})=>(disabled ? "darkgray" :`white`)};

`

const SwitchButton = styled.span`
  
  height: 20px;
  display: block;
  margin: 10px auto;
  /* border: 1px solid black; */
`