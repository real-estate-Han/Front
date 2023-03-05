import React from 'react';

export interface postShorten {
  itemId: string;
  itemNumber: number;
  itemTitle: string;
  itemTitleImage: string;
  itemDeposit: number;
  itemMonthly: string;
  itemAll: number;
  itemSale: number;
}
// item_unique_id: number;
//   item_adress?: string;
//   item_type?: string;
//   item_deposit?: number;
//   item_monthly?: number;
//   item_all?: number;
//   item_sale?: number;
//   item_management?: number;
//   item_area: { item_area_land: number; item_area_building: number };
//   item_floor: string;
//   item_purpose: string;
//   item_status: string;
//   item_field: number;
//   item_theme: string;
//   item_movein: string;
//   item_approval: number;
//   item_subway: string;
//   item_description: string;
// item_titleimg?: string;
// item_detailimg?: string[];
//   item_manager: { item_manager_id: number; item_manager_ref: string };
//   item_location: { item_location_x: number; item_location_y: number };
//   item_tag: string[];
//   item_option?: string;
//   item_electricity?: number;
//   item_createdAt: string;
//   item_updatedAt: string;
