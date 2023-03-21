export interface postType {
  itemUniqueID: number;
  itemAddress?: string;
  itemType?: string;
  itemDeposit?: number;
  itemMonthly?: number;
  itemJense?: number;
  itemSale?: number;
  itemManagement?: number;
  itemAreaLand?: number;
  itemAreaBuilding?: number;
  itemFloor?: string;
  itemPurpose?: string;
  itemStatus?: string;
  itemField?: number;
  itemTheme?: string;
  itemMovein?: string;
  itemApproval?: number;
  itemSubway?: string;
  itemDescription?: string;
  itemTitleimg?: string;
  itemDetailimg?: string[];
  itemManager?: { item_manager_id: number; item_manager_ref: string };
  itemLocation?: { item_location_x: number; item_location_y: number };
  itemTag?: string[];
  itemOption?: string;
  itemElectricity?: number;
  itemCreatedAt?: string;
  itemUpdatedAt?: string;
}

// 매물번호 : number
// 주소: string
// 매물종류 : string
// 보증금? : number
// 월세? : number
// 전세? :number
// 매매? : number
// 관리비 number
// 면적정보 :{대지 : number, 건축 : number}
// 층정보 : string
// 주용도 : string
// 매물상태 : string
// 필지수 : number
// 테마 : string
// 입주가능일 : string
// 사용승인일 : number
// 인근지하철 : string
// 상세설명 :string
// titleImg : string
// detailImg : string[]
// 담당자 : object_id, user ref
// 위치주소 : {x:number,y:number}
// 태그 : string[]
// 옵션? : string
// 전력?: number
// 만든날짜
// 수정날짜

// 토지합계면적 : number
// 용도지역 : string}

// }
export type GeoLocation = {
  lat: number;
  lng: number;
};
