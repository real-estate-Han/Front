import { postType } from '@utils/type';
import { create } from 'zustand';

export type FilterData = {
  id: number;
  type: string;
  transaction: string;
  saleMin: number;
  saleMax: number;
  monthlyMin: number;
  monthlyMax: number;
  jenseMin: number;
  jenseMax: number;
  depositMin: number;
  depositMax: number;
  manageMin: number;
  manageMax: number;
  areaMin: number;
  areaMax: number;
  buildingMin: number;
  buildingMax: number;
  landMin: number;
  landMax: number;
};

const initialData = {
  id: 0,
  type: 'none',
  transaction: 'none',
  saleMin: 0,
  saleMax: 100000,
  monthlyMin: 0,
  monthlyMax: 300,
  jenseMin: 0,
  jenseMax: 100000,
  depositMin: 0,
  depositMax: 100000,
  manageMin: 0,
  manageMax: 300,
  areaMin: 0,
  areaMax: 300,
  buildingMin: 0,
  buildingMax: 300,
  landMin: 0,
  landMax: 300,
};

interface State {
  filtercondition: FilterData;
  filterdData: postType[];
  SelectedData?: postType[];
  setFilterdData: (data?: postType[]) => void;
  setFilterCondition: (key: string, data: any) => void;
  setSelectedData: (data?: postType[]) => void;
}

// 모달창 상태 관리 및 매물 상태관리
const useStoreFilter = create<State>(set => ({
  filtercondition: initialData,

  setFilterCondition: (key: string, data: any) =>
    set(state => ({
      filtercondition: { ...state.filtercondition, [key]: data },
    })),
  filterdData: [],
  setFilterdData: (data?: postType[]) => set(state => ({ filterdData: data })),
  SelectedData: [],
  setSelectedData: (data?: postType[]) =>
    set(state => ({ SelectedData: data })),
}));

export default useStoreFilter;

// function searchProperties(filters: any) {
//   const filteredData = dataList.filter((property: any) => {
//     // eslint-disable-next-line no-restricted-syntax
//     for (const key of Object.keys(filters)) {
//       const filterValue = filters[key];
//       if (filterValue) {
//         if (key === 'price' || key === 'managementFee' || key === 'area') {
//           const [min, max] = filterValue.split('-');
//           if (property[key] < Number(min) || property[key] > Number(max)) {
//             return false;
//           }
//         } else if (property[key] !== filterValue) {
//           return false;
//         }
//       }
//     }
//     return true;
//   });

//   return filteredData;
// }

// // 검색 필터 예시
// const filters = {
//   type: 'apartment',
//   deal: 'sale',
//   price: '100000-250000',
//   managementFee: '0-150',
//   area: '500-1000',
// };

// // 검색 필터링 수행
// const filteredData = searchProperties(filters);
// console.log(filteredData);
export const selectedData = (data: postType[], filters: FilterData) => {
  const filteredData = data.filter(item => {
    // type 필터링
    if (filters.type !== 'none' && item.itemType !== filters.type) {
      console.log('타입', item);
      return false;
    }

    // transaction 필터링
    if (
      filters.transaction !== 'none' &&
      item.transactionType !== filters.transaction
    ) {
      console.log('종류');
      return false;
    }

    // saleMin, saleMax 필터링
    if (
      item.itemSale &&
      (item.itemSale < filters.saleMin || item.itemSale > filters.saleMax)
    ) {
      console.log('매매');
      return false;
    }

    // monthlyMin, monthlyMax 필터링
    if (
      item.itemMonthly &&
      (item.itemMonthly < filters.monthlyMin ||
        item.itemMonthly > filters.monthlyMax)
    ) {
      console.log('월세');
      return false;
    }

    // jenseMin, jenseMax 필터링
    if (
      item.itemJense &&
      (item.itemJense < filters.jenseMin || item.itemJense > filters.jenseMax)
    ) {
      console.log('전세');
      return false;
    }

    // depositMin, depositMax 필터링
    if (
      item.itemDeposit &&
      (item.itemDeposit < filters.depositMin ||
        item.itemDeposit > filters.depositMax)
    ) {
      console.log('보증금');
      return false;
    }

    // manageMin, manageMax 필터링
    if (
      item.itemManagement &&
      (item.itemManagement < filters.manageMin ||
        item.itemManagement > filters.manageMax)
    ) {
      return false;
    }

    // areaMin, areaMax 필터링
    if (
      item.itemExclusiveArea &&
      (Math.floor(item.itemExclusiveArea * 0.3025) < filters.areaMin ||
        Math.floor(item.itemExclusiveArea * 0.3025) > filters.areaMax)
    ) {
      return false;
    }

    // buildingMin, buildingMax 필터링
    if (
      item.itemAreaBuilding &&
      (Math.floor(item.itemAreaBuilding * 0.3025) < filters.buildingMin ||
        Math.floor(item.itemAreaBuilding * 0.3025) > filters.buildingMax)
    ) {
      return false;
    }

    // landMin, landMax 필터링
    if (
      item.itemTotalAreaLand &&
      (Math.floor(item.itemTotalAreaLand * 0.3025) < filters.landMin ||
        Math.floor(item.itemTotalAreaLand * 0.3025) > filters.landMax)
    ) {
      return false;
    }

    return true;
  });
  return filteredData;
};
