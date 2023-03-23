export interface postInputType {
  itemUniqueID: number;
  itemAddress: string;
  itemGeoLocation: GeoLocation;
  itemType: string;
  itemDeposit?: number;
  itemMonthly?: number;
  itemJense?: number;
  itemSale?: number;
  itemManagement?: number;
  itemAreaLand?: number;
  itemAreaBuilding?: number;
  itemFloor?: number;
  itemPurpose?: string;
  itemRooms?: string;
  itemStatus?: string;
  itemField?: string;
  itemMovein?: string;
  itemApproval?: string;
  itemSubway?: string;
  itemTitleimg: string;
  itemDetailimg?: [string];
  itemTag?: [string];
  itemElectricity?: number;
  itemOption?: [string];
}

export interface postType extends postInputType {
  itemID?: string;
  creator?: User;
  createdAt?: string;
  updatedAt?: string;
}

export type GeoLocation = {
  lat: number;
  lng: number;
};

export type User = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
};
