import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { postType } from '@utils/type';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';

interface InputProps {
  register: UseFormRegister<postType>;
  getValues: UseFormGetValues<postType>;
  errors: FieldErrors<postType>;
  tabIndex: string;
  transactionType: string;
  itemType: string;
}

const PostItemList = ({
  register,
  errors,
  transactionType,
  itemType,
}: InputProps) => {
  // 매물 타입에따른 인풋창 변화
  const sellType = transactionType;
  const postType1 = itemType;

  return (
    <>
      <Inputs
        type="number"
        text="매물번호"
        {...register('itemUniqueID', {
          required: '필수입력사항입니다.',
          valueAsNumber: true,
        })}
      />
      <span>{errors?.itemUniqueID?.message}</span>
      <Inputs
        type="text"
        text="담당자"
        {...register('itemCharge', {
          required: '필수입력사항입니다.',
        })}
      />
      <span>{errors?.itemUniqueID?.message}</span>
      {sellType === 'monthly' && (
        <>
          <Inputs
            type="number"
            text="매물월세 (만원)"
            {...register('itemMonthly', { valueAsNumber: true })}
          />
          <span>{errors?.itemMonthly?.message}</span>

          <Inputs
            type="number"
            text="매물보증금 (만원)"
            {...register('itemDeposit', { valueAsNumber: true })}
          />
          <span>{errors?.itemDeposit?.message}</span>
        </>
      )}
      {sellType === 'jense' && (
        <>
          <Inputs
            type="number"
            text="매물전세보증금 (만원)"
            {...register('itemJense', { valueAsNumber: true })}
          />
          <span>{errors?.itemJense?.message}</span>
        </>
      )}
      {sellType === 'sale' && (
        <>
          <Inputs
            type="number"
            text="매물매매가 (만원)"
            {...register('itemSale', { valueAsNumber: true })}
          />
          <span>{errors?.itemSale?.message}</span>
        </>
      )}
      {postType1 !== 'land' && (
        <>
          <Inputs
            type="number"
            text="매물관리비 (만원)"
            {...register('itemManagement', { valueAsNumber: true })}
          />
          <span>{errors?.itemManagement?.message}</span>

          <Inputs
            type="text"
            text="관리비 포함"
            {...register('itemManagementInfo')}
          />
          <span>{errors?.itemManagementInfo?.message}</span>

          <Inputs
            type="text"
            text="별도 부과 관리비"
            {...register('itemManagementException')}
          />
          <span>{errors?.itemManagementException?.message}</span>

          <Inputs
            type="number"
            text="매물층수"
            {...register('itemFloor', { valueAsNumber: true })}
          />
          <DetailDescription>
            반지하 0, 옥탑방 99로 입력해주세요
          </DetailDescription>
          <span>{errors?.itemFloor?.message}</span>
          <Inputs
            type="nu,ber"
            text="매물 최고층수"
            {...register('itemTotalFloor', { valueAsNumber: true })}
          />
          <span>{errors?.itemTotalFloor?.message}</span>
        </>
      )}

      {(postType1 === 'house' ||
        postType1 === 'shop' ||
        postType1 === 'oneroom' ||
        postType1 === 'tworoom' ||
        postType1 === 'office' ||
        postType1 === 'apartment') && (
        <>
          <Inputs
            type="float"
            text="공급면적"
            {...register('itemSupplyArea', { valueAsNumber: true })}
          />
          <span>{errors?.itemSupplyArea?.message}</span>

          <Inputs
            type="float"
            text="전용면적"
            {...register('itemExclusiveArea', { valueAsNumber: true })}
          />
          <span>{errors?.itemExclusiveArea?.message}</span>
          <Inputs
            type="number"
            text="방 개수"
            {...register('itemRooms', { valueAsNumber: true })}
          />
          <span>{errors?.itemRooms?.message}</span>
          <Inputs
            type="number"
            text="화장실개수"
            {...register('itemBathroom', { valueAsNumber: true })}
          />
          <span>{errors?.itemRooms?.message}</span>
          <Inputs
            type="string"
            text="엘리베이터여부"
            {...register('itemElevator')}
          />
          <span>{errors?.itemElevator?.message}</span>

          <Inputs type="string" text="난방방식" {...register('itemHeating')} />
          <span>{errors?.itemHeating?.message}</span>

          <Inputs type="string" text="주차" {...register('itemParking')} />
          <span>{errors?.itemParking?.message}</span>
          <Inputs
            type="number"
            text="주차비"
            {...register('itemParkingFee', { valueAsNumber: true })}
          />
          <span>{errors?.itemParkingFee?.message}</span>
          <Inputs
            type="string"
            text="발코니/배란다"
            {...register('itemBalcony')}
          />
          <span>{errors?.itemBalcony?.message}</span>

          <Inputs type="string" text="방향" {...register('itemDirection')} />
          <span>{errors?.itemDirection?.message}</span>

          <Inputs
            type="date"
            text="매물입주가능날짜"
            {...register('itemMovein')}
          />
          <span>{errors?.itemMovein?.message}</span>

          <Inputs
            type="text"
            text="보안/안전시설"
            {...register('itemSecurity')}
          />
          <DetailDescription>
            ,로 구분지어주세요 ex) 공동현관,CCTV,경보기{' '}
          </DetailDescription>
          <span>{errors?.itemFloor?.message}</span>
        </>
      )}

      {(postType1 === 'factory' || postType1 === 'shop') && (
        <>
          <Inputs
            type="number"
            text="대지면적"
            {...register('itemAreaLand', { valueAsNumber: true })}
          />
          <span>{errors?.itemAreaLand?.message}</span>

          <Inputs
            type="number"
            text="건축면적"
            {...register('itemAreaBuilding', { valueAsNumber: true })}
          />
          <span>{errors?.itemAreaBuilding?.message}</span>

          <Inputs
            type="number"
            text="층고"
            {...(register('itemFloorHeight'), { valueAsNumber: true })}
          />
          <span>{errors?.itemFloorHeight?.message}</span>

          <Inputs type="text" text="화물차량 진입" {...register('itemTruck')} />
          <span>{errors?.itemTruck?.message}</span>
        </>
      )}
      <Inputs type="string" text="사용 용도" {...register('itemPurpose')} />
      <span>{errors?.itemPurpose?.message}</span>

      <Inputs type="date" text="사용승인일" {...register('itemApproval')} />
      <span>{errors?.itemApproval?.message}</span>
      {postType1 === 'land' && (
        <>
          <Inputs
            type="float"
            text="토지합계면적"
            {...register('itemTotalAreaLand', { valueAsNumber: true })}
          />
          <span>{errors?.itemTotalAreaLand?.message}</span>

          <Inputs type="text" text="지목" {...register('itemLandCategory')} />
          <span>{errors?.itemLandCategory?.message}</span>

          <Inputs type="text" text="필지수" {...register('itemLandNumber')} />
          <span>{errors?.itemLandNumber?.message}</span>
          <>
            <Inputs
              type="text"
              text="민통선 여부 "
              list="optionlist"
              {...register('itemControlLine')}
            />
            <datalist id="optionlist">
              <option value="민통선" />
              <option value="그외" />
            </datalist>
          </>
          <span>{errors?.itemControlLine?.message}</span>
          <Inputs type="text" text="화물차량 진입" {...register('itemTruck')} />
          <span>{errors?.itemTruck?.message}</span>
        </>
      )}
      <Inputs type="text" text="융자 여부" {...register('itemLoan')} />
      <span>{errors?.itemSubway?.message}</span>

      <Inputs
        type="text"
        text="매물 가까운 지하철"
        {...register('itemSubway')}
      />
      <span>{errors?.itemSubway?.message}</span>

      <Inputs type="text" text="매물 옵션" {...register('itemOption')} />
      <DetailDescription>옵션 설명마다 /를 붙여주세요</DetailDescription>
      <br />
      <DetailDescription>예) 올수리/가스레인지/전자도어락</DetailDescription>
      <span>{errors?.itemOption?.message}</span>
      <Inputs
        textarea
        type="text"
        text="매물 추가 설명"
        {...register('itemMoreInfo')}
      />
      <DetailDescription>추가 설명마다 /를 붙여주세요</DetailDescription>
      <br />
      <span>{errors?.itemMoreInfo?.message}</span>
    </>
  );
};
export default PostItemList;
const DetailDescription = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;
