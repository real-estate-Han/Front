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

export const filterInitialData = {
  id: 0,
  type: 'none',
  transaction: 'none',
  saleMin: 0,
  saleMax: 100000,
  monthlyMin: 0,
  monthlyMax: 500,
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
  isFiltered: boolean;
  filtercondition: FilterData;
  filterdData: postType[];
  selectedData: postType[];
  setIsFiltered: (data: boolean) => void;
  setFilterdData: (data?: postType[]) => void;
  setFilterCondition: (key: string, data: any) => void;
  setSelectedData: (data?: postType[]) => void;
  resetFilterCondition: (data: FilterData) => void;
  initialDatas: postType[];
  setInitialDatas: (data: postType[]) => void;
}

// 모달창 상태 관리 및 매물 상태관리
const useStoreFilter = create<State>(set => ({
  isFiltered: false,
  filtercondition: filterInitialData,
  setFilterCondition: (key: string, data: any) =>
    set(state => ({
      filtercondition: { ...state.filtercondition, [key]: data },
    })),
  filterdData: [],
  initialDatas: [],
  setInitialDatas: (data: postType[]) => set(state => ({ initialDatas: data })),
  resetFilterCondition: (data: FilterData) =>
    set(state => ({ filtercondition: data })),
  setIsFiltered: (data: boolean) => set(state => ({ isFiltered: data })),
  setFilterdData: (data?: postType[]) => set(state => ({ filterdData: data })),
  selectedData: [],
  setSelectedData: (data?: postType[]) =>
    set(state => ({ selectedData: data })),
}));

export default useStoreFilter;

export const selectedDataFn = (data: postType[], filters: FilterData) => {
  const filteredData = data.filter(item => {
    // type 필터링
    if (filters.type !== 'none' && item.itemType !== filters.type) {
      return false;
    }

    // transaction 필터링
    if (
      filters.transaction !== 'none' &&
      item.transactionType !== filters.transaction
    ) {
      return false;
    }

    // saleMin, saleMax 필터링
    if (
      item.itemSale &&
      (item.itemSale < filters.saleMin || item.itemSale > filters.saleMax)
    ) {
      return false;
    }

    // monthlyMin, monthlyMax 필터링
    if (
      item.itemMonthly &&
      (item.itemMonthly < filters.monthlyMin ||
        item.itemMonthly > filters.monthlyMax)
    ) {
      return false;
    }

    // jenseMin, jenseMax 필터링
    if (
      item.itemJense &&
      (item.itemJense < filters.jenseMin || item.itemJense > filters.jenseMax)
    ) {
      return false;
    }

    // depositMin, depositMax 필터링
    if (
      item.itemDeposit &&
      (item.itemDeposit < filters.depositMin ||
        item.itemDeposit > filters.depositMax)
    ) {
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
