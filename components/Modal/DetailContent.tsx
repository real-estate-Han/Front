import React from 'react';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_POST, GET_DETAIL_POST, GET_USER } from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
import Image from 'next/image';
import { S3DeleteFile, S3DeleteFiles } from '@utils/S3util';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
export interface LoginContentType {
  email: string;
  password: string;
}

const DetailContent = () => {
  const { detailID, detailType, changeDetailState } = useStore(state => state);
  const itemDetailsellType = detailType && detailType.split('/')[0];
  const itemDetailType = detailType && detailType.split('/')[1];

  const {
    data: DetailData,
    loading,
    error,
  } = useQuery(GET_DETAIL_POST, {
    variables: {
      postId: detailID,
    },
    fetchPolicy: 'network-only',
  });

  const [deleteMutate, { error: mutateErr }] = useMutation(DELETE_POST);
  const DeletePost = () => {
    // console.log(mutateErr);
    if (!mutateErr) {
      Swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제된 데이터는 복구되지 않습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          await deleteMutate({
            variables: { deletePostId: detailID },
            refetchQueries: [{ query: GET_CLUSTER_DATA }],
          }).then(async () => {
            await S3DeleteFile(DetailData.post.itemTitleimg);
            await S3DeleteFiles(DetailData.post.itemDetailimg);
          });
          Swal.fire('삭제되었습니다.', '', 'success');
          changeDetailState();
        }
      });
    } else {
      Swal.fire(mutateErr.message, '', 'error');
    }
  };
  console.log(DetailData?.post);
  return (
    <div>
      {/* <button onClick={DeletePost}>삭제하기</button> */}
      <Image src={DetailData?.post.itemTitleimg || './next.svg'} alt="titleImage" width={500} height={500}></Image>
      <p>매물번호{DetailData?.post.itemUniqueID}</p>
      <div className="ItemPrice"></div>
      <PostTable>
        <tbody>
          <tr>
            <th>매물 주소</th>
            <td>{DetailData?.post.itemAddress}</td>
          </tr>
          {itemDetailsellType == 'jense' && (
            <>
              <th>전세</th>
              <td>{DetailData?.post.itemJense}</td>
            </>
          )}
          {itemDetailsellType == 'sale' && (
            <>
              <th>매매가</th>
              <td>{DetailData?.post.itemSale}</td>
            </>
          )}
          <tr>
            {itemDetailsellType == 'monthly' && (
              <>
                <th>월세</th>
                <td>{DetailData?.post.itemMonthly}</td>
                <th>보증금</th>
                <td>{DetailData?.post.itemDeposit}</td>
              </>
            )}
          </tr>
          {itemDetailType !== 'land' && (
            <>
              <tr>
                <th>관리비</th>
                <td>{DetailData?.post.itemManagement}</td>
                <th>층수</th>
                <td>{DetailData?.post.itemFloor}</td>
              </tr>
            </>
          )}
          {(itemDetailType === 'House' || itemDetailType === 'Mart') && (
            <>
              <tr>
                <th>공급면적</th>
                <td>{DetailData?.post.itemManagement}</td>
                <th>전용면적</th>
                <td>{DetailData?.post.itemFloor}</td>
              </tr>
              <tr>
                <th>엘리베이터</th>
                <td>{DetailData?.post.itemElevator}</td>
                <th>난방방식</th>
                <td>{DetailData?.post.itemHeating}</td>
              </tr>
              <tr>
                <th>주차</th>
                <td>{DetailData?.post.itemParking}</td>
                <th>발코니/배란다</th>
                <td>{DetailData?.post.itemBalcony}</td>
              </tr>
              <tr>
                <th>방향</th>
                <td>{DetailData?.post.itemDirection}</td>
                <th>입주가능날짜</th>
                <td>{DetailData?.post.itemMovein}</td>
              </tr>
            </>
          )}
          {(itemDetailType === 'Factory' || itemDetailType === 'Mart') && (
            <>
              <tr>
                <th>대지면적</th>
                <td>{DetailData?.post.itemAreaLand}</td>
                <th>건축면적</th>
                <td>{DetailData?.post.itemAreaBuilding}</td>
              </tr>
              <tr>
                <th>건물층고</th>
                <td>{DetailData?.post.itemFloorHeight}</td>
                <th>화물차량 진입</th>
                <td>{DetailData?.post.itemTruck}</td>
              </tr>
            </>
          )}
          <tr>
            <th>사용 용도</th>
            <td>{DetailData?.post.itemPurpose}</td>
            <th>사용 승인일</th>
            <td>{DetailData?.post.itemApproval}</td>
          </tr>
          {itemDetailType === 'Land' && (
            <>
              <tr>
                <th>토지합계면적</th>
                <td>{DetailData?.post.itemAreaTotal}</td>
                <th>지목</th>
                <td>{DetailData?.post.itemLandType}</td>
                <th>필지수</th>
                <td>{DetailData?.post.itemLandNumber}</td>
              </tr>
            </>
          )}
          <tr>
            <th>가까운 지하철</th>
            <td>{DetailData?.post.itemSubway}</td>
          </tr>
          <tr>
            <th>옵션/추가설명</th>
            <td>{DetailData?.post.itemOption}</td>
          </tr>
        </tbody>
      </PostTable>
      {DetailData?.post.itemDetailimg.map((pic: string, index: number) => {
        return <Image key={index} src={pic || './next.svg'} alt="titleImage" width={500} height={500}></Image>;
      })}
    </div>
  );
};

export default DetailContent;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  empty-cells: show;
  border-spacing: 0;
  border: 1px solid #e9ecef;
  tbody {
    border: 1px solid #e9ecef;
    th {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #e9ecef;
      border-bottom: 1px solid #e9ecef;
      border-right: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      background-color: #f8f9fa;
      text-align: center;
    }
    td {
      padding: 0.75rem;
      /* vertical-align: top; */
      border-top: 1px solid #e9ecef;
      border-bottom: 1px solid #e9ecef;
      border-right: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      text-align: center;
    }
  }
`;
