import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface FormProps {
  test?: string;
  test2?: string;
}
export default function PostItem() {
  const {
    register,

    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const [textBox, setTextBox] = useState<string>('');
  const onSubmit: SubmitHandler<FormProps> = (data) => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool',
    });
    console.log('data', data);
    data.test2 && setTextBox(data?.test2);
  };

  return (
    <Wrap>
      <h3>상품추가 페이지</h3>
      <></>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>이미지 인풋자리</section>
        <section>
          <Inputs type="text" text="test" {...register('test', { required: '필수입력사항입니다.' })}></Inputs>
          <span>{errors?.test?.message}</span>
          <textarea {...register('test2', { required: true })}></textarea>
        </section>
        <input type="submit"></input>
      </form>
      <p>{textBox}</p>
      <div></div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  form {
    width: 90%;
  }
  section:nth-of-type(1) {
    border: 1px solid blue;
  }
  section:nth-of-type(2) {
    border: 1px solid green;
    width: 100%;
  }
`;
