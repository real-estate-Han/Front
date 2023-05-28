import { MdOutlineCalendarToday } from 'react-icons/md';
import HomeIcon from 'public/icon/homeicon';
import { postType } from './type';

const changeCash = (value: number) => {
  const billion = Math.floor(value / 10000);
  const million = Math.floor(value % 10000);

  let formattedValue = '';
  if (billion > 0) {
    formattedValue += `${billion}억 `;
  }
  if (million > 0) {
    formattedValue += `${million}만원`;
  }

  return formattedValue;
};

export const TitleString = (transactionType: string, postData: postType) => {
  switch (transactionType) {
    case 'monthly':
      if (postData.itemMonthly && postData.itemDeposit) {
        return `월세 ${changeCash(postData.itemMonthly)} / 보증금${changeCash(
          postData.itemDeposit,
        )}`;
      }
      break;
    case 'jense':
      if (postData.itemJense) {
        return `전세 ${changeCash(postData.itemJense)}`;
      }
      break;
    case 'sale':
      if (postData.itemSale) {
        return `매매 ${changeCash(postData.itemSale)}`;
      }
      break;
    default:
      return '';
  }
};

export const itemTypeString = (itemType: string, postData: postType) => {
  switch (itemType) {
    case 'land':
      return `토지 `;

    case 'apartment':
      return `아파트 `;

    case 'oneroom':
      return `원룸 `;

    case 'tworoom':
      return `투-쓰리룸 `;

    case 'office':
      return `오피스텔 `;

    case 'house':
      return `주택 `;

    case 'factory':
      return `공장-창고 `;

    case 'shop':
      return `상가 `;
    default:
      return '';
  }
};

export const itemSpace = (itemType: string, postData: postType) => {
  if (
    itemType === 'house' ||
    itemType === 'shop' ||
    itemType === 'oneroom' ||
    itemType === 'tworoom' ||
    itemType === 'office' ||
    itemType === 'apartment'
  ) {
    return `${postData.itemSupplyArea}m2`;
  }
  if (itemType === 'land') {
    return `${postData.itemTotalAreaLand}m2`;
  }
  if (itemType === 'factory') {
    return `${postData.itemAreaLand}m2`;
  }
};

export const itemSpacem2 = (itemType: string, postData: postType) => {
  const m2ToPyong = (m2: number | undefined) => {
    if (m2) {
      const pyong = Math.floor(m2 * 0.3025);
      return pyong;
    }
  };
  if (
    itemType === 'house' ||
    itemType === 'shop' ||
    itemType === 'oneroom' ||
    itemType === 'tworoom' ||
    itemType === 'office' ||
    itemType === 'apartment'
  ) {
    return `공급면적 : ${postData.itemSupplyArea}m2(${m2ToPyong(
      postData?.itemSupplyArea,
    )}평) / 전용면적 : ${postData.itemExclusiveArea}m2 (${m2ToPyong(
      postData.itemExclusiveArea,
    )}평)`;
  }
  if (itemType === 'land') {
    return `토지합계면적 : ${postData.itemTotalAreaLand}m2 (${m2ToPyong(
      postData.itemTotalAreaLand,
    )}평) `;
  }
  if (itemType === 'factory') {
    return `대지면적 : ${postData.itemAreaLand}m2 (${m2ToPyong(
      postData.itemAreaLand,
    )}평) / 건축면적 : ${postData.itemAreaBuilding}m2 (${m2ToPyong(
      postData.itemAreaBuilding,
    )}평)`;
  }
};

export const itemRoomString = (itemType: string, postData: postType) => {
  switch (itemType) {
    case 'land':
      return `토지 지목 : ${postData?.itemLandCategory} / 필지수 : ${postData?.itemLandNumber} `;

    case 'apartment':
      return `방개수 : ${postData?.itemRooms}개 / 화장실 : ${postData?.itemBathroom}개 `;

    case 'oneroom':
      return `원룸 / 화장실 : ${postData?.itemBathroom}개 `;

    case 'tworoom':
      return `투-쓰리룸 / 화장실 : ${postData?.itemBathroom}개 `;

    case 'office':
      return `방개수 : ${postData?.itemRooms}개 / 화장실 : ${postData?.itemBathroom}개 `;

    case 'house':
      return `방개수 : ${postData?.itemRooms}개 / 화장실 : ${postData?.itemBathroom}개 `;

    case 'factory':
      return `공장-창고 `;

    case 'shop':
      return `방개수 : ${postData?.itemRooms}개 / 화장실 : ${postData?.itemBathroom}개 `;
    default:
      return '';
  }
};
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const itemParkingString = (itemType: string, postData: postType) => {
  if (
    itemType === 'house' ||
    itemType === 'shop' ||
    itemType === 'oneroom' ||
    itemType === 'tworoom' ||
    itemType === 'office' ||
    itemType === 'apartment'
  ) {
    return `주차 : ${postData.itemParking}`;
  }
  if (itemType === 'land') {
    return `화물차량 진입 : ${postData.itemTruck}`;
  }
  if (itemType === 'factory') {
    return `화물차량 진입 : ${postData.itemTruck}`;
  }
};

export const itemFloorString = (itemType: string, postData: postType) => {
  if (
    itemType === 'house' ||
    itemType === 'shop' ||
    itemType === 'oneroom' ||
    itemType === 'tworoom' ||
    itemType === 'office' ||
    itemType === 'apartment'
  ) {
    return (
      <>
        <MdOutlineCalendarToday size={24} />
        <p>
          {postData.itemFloor ?? '??'}층 / {postData.itemTotalFloor ?? '??'}층
        </p>
      </>
    );
  }
  if (itemType === 'land') {
    return (
      <>
        <MdOutlineCalendarToday size={24} />
        <p>
          {postData.itemFloor ?? '??'}층 / {postData.itemTotalFloor ?? '??'}층
        </p>
      </>
    );
  }
  if (itemType === 'factory') {
    return `화물차량 진입 : ${postData.itemTruck}`;
  }
};

export const itemMoveinString = (itemType: string, postData: postType) => {
  const MoveinDate = (dateStr: string | undefined) => {
    if (dateStr) {
      const date = new Date(dateStr);
      const today = new Date();

      if (date <= today) {
        return '즉시 입주 가능';
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `입주 가능일 : ${year}-${month}-${day}`;
    }
  };
  if (
    itemType === 'house' ||
    itemType === 'shop' ||
    itemType === 'oneroom' ||
    itemType === 'tworoom' ||
    itemType === 'office' ||
    itemType === 'apartment'
  ) {
    return (
      <>
        <HomeIcon />
        <p> {MoveinDate(postData.itemMovein)}</p>
      </>
    );
  }
  if (itemType === 'land') {
    return;
  }
  if (itemType === 'factory') {
    return null;
  }
};
export const itemPriceString = (
  transactionType: string,
  postData: postType,
) => {
  switch (transactionType) {
    case 'monthly':
      if (postData.itemMonthly && postData.itemDeposit) {
        return ` ${changeCash(postData.itemMonthly)} / ${changeCash(
          postData.itemDeposit,
        )}`;
      }
      break;
    case 'jense':
      if (postData.itemJense) {
        return `${changeCash(postData.itemJense)}`;
      }
      break;
    case 'sale':
      if (postData.itemSale) {
        return `${changeCash(postData.itemSale)}`;
      }
      break;
    default:
      return '';
  }
};
export const itemtransactionTypeString = (
  transactionType: string,
  postData: postType,
) => {
  switch (transactionType) {
    case 'monthly':
      if (postData.itemMonthly && postData.itemDeposit) {
        return `월세 / 보증금`;
      }
      break;
    case 'jense':
      if (postData.itemJense) {
        return `전세`;
      }
      break;
    case 'sale':
      if (postData.itemSale) {
        return `매매`;
      }
      break;
    default:
      return '';
  }
};
