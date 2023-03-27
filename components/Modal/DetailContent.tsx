import React from 'react';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_POST, GET_DETAIL_POST } from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
import Image from 'next/image';
import { S3DeleteFile, S3DeleteFiles } from '@pages/post/S3util';
export interface LoginContentType {
  email: string;
  password: string;
}

const DetailContent = () => {
  const { detailID } = useStore((state) => state);
  const {
    data: DetailData,
    loading,
    error,
  } = useQuery(GET_DETAIL_POST, {
    variables: {
      postId: detailID,
    },
  });
  console.log(DetailData?.post);
  const [deleteMutate, {}] = useMutation(DELETE_POST);
  const DeletePost = () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제된 데이터는 복구되지 않습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await S3DeleteFile(DetailData.post.itemTitleimg);
        await S3DeleteFiles(DetailData.post.itemDetailimg);
        await deleteMutate({ variables: { deletePostId: detailID } });
        Swal.fire('삭제되었습니다.', '', 'success');
      }
    });
  };
  return (
    <div>
      <button onClick={DeletePost}>삭제하기</button>
      <Image src={DetailData?.post.itemTitleimg || './next.svg'} alt="titleImage" width={120} height={120}></Image>
      <p>매물번호{DetailData?.post.itemUniqueID}</p>
      <div className="ItemPrice"></div>
    </div>
  );
};

export default DetailContent;
