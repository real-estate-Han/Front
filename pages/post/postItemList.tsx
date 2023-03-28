import { Inputs } from "@components/Inputs";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { postType } from "@utils/type";

interface InputProps {
  register: UseFormRegister<postType>;
  errors: FieldErrors<postType>;
  tabIndex: string;
}

export default function PostItemList({
  register,
  errors,
  tabIndex,
}: InputProps) {
  const sellType = tabIndex.split("/")[0];
  const postType = tabIndex.split("/")[1];

  return (
    <>
      <Inputs
        type="number"
        text="매물번호"
        {...register("itemUniqueID", {
          required: "필수입력사항입니다.",
          valueAsNumber: true,
        })}
      />
      <span>{errors?.itemUniqueID?.message}</span>
      {sellType === "monthly" && (
        <>
          <Inputs
            type="number"
            text="매물월세"
            {...register("itemMonthly", { valueAsNumber: true })}
          />
          <span>{errors?.itemMonthly?.message}</span>

          <Inputs
            type="number"
            text="매물보증금"
            {...register("itemDeposit", { valueAsNumber: true })}
          />
          <span>{errors?.itemDeposit?.message}</span>
        </>
      )}
      {sellType === "jense" && (
        <>
          <Inputs
            type="number"
            text="매물전세보증금"
            {...register("itemJense", { valueAsNumber: true })}
          />
          <span>{errors?.itemJense?.message}</span>
        </>
      )}
      {postType !== "Land" && (
        <>
          <Inputs
            type="number"
            text="매물관리비"
            {...register("itemManagement", { valueAsNumber: true })}
          />
          <span>{errors?.itemManagement?.message}</span>
          <Inputs
            type="number"
            text="매물층수"
            {...register("itemFloor", { valueAsNumber: true })}
          />
          <span>{errors?.itemFloor?.message}</span>
        </>
      )}
      {sellType === "sale" && (
        <>
          <Inputs
            type="number"
            text="매물매매가"
            {...register("itemSale", { valueAsNumber: true })}
          />
          <span>{errors?.itemSale?.message}</span>
        </>
      )}
      {(postType === "House" || postType === "Mart") && (
        <>
          <Inputs
            type="float"
            text="공급면적"
            {...register("itemSupplyArea", { valueAsNumber: true })}
          />
          <span>{errors?.itemSupplyArea?.message}</span>

          <Inputs
            type="float"
            text="전용면적"
            {...register("itemExclusiveArea", { valueAsNumber: true })}
          />
          <span>{errors?.itemExclusiveArea?.message}</span>
          <Inputs type="string" text="방/화장실" {...register("itemRooms")} />
          <span>{errors?.itemRooms?.message}</span>
          <Inputs
            type="string"
            text="엘리베이터여부"
            {...register("itemElevator")}
          />
          <span>{errors?.itemElevator?.message}</span>

          <Inputs type="string" text="난방방식" {...register("itemHeating")} />
          <span>{errors?.itemHeating?.message}</span>

          <Inputs type="string" text="주차" {...register("itemParking")} />
          <span>{errors?.itemParking?.message}</span>

          <Inputs
            type="string"
            text="발코니/배란다"
            {...register("itemBalcony")}
          />
          <span>{errors?.itemBalcony?.message}</span>

          <Inputs type="string" text="방향" {...register("itemDirection")} />
          <span>{errors?.itemDirection?.message}</span>

          <Inputs
            type="date"
            text="매물입주가능날짜"
            {...register("itemMovein")}
          />
          <span>{errors?.itemMovein?.message}</span>
        </>
      )}

      {(postType === "Factory" || postType === "Mart") && (
        <>
          <Inputs
            type="number"
            text="대지면적"
            {...register("itemAreaLand", { valueAsNumber: true })}
          />
          <span>{errors?.itemAreaLand?.message}</span>

          <Inputs
            type="number"
            text="건축면적"
            {...register("itemAreaBuilding", { valueAsNumber: true })}
          />
          <span>{errors?.itemAreaBuilding?.message}</span>

          <Inputs
            type="number"
            text="층고"
            {...(register("itemFloorHeight"), { valueAsNumber: true })}
          />
          <span>{errors?.itemFloorHeight?.message}</span>

          <Inputs type="text" text="화물차량 진입" {...register("itemTruck")} />
          <span>{errors?.itemTruck?.message}</span>
        </>
      )}
      <Inputs type="string" text="사용 용도" {...register("itemPurpose")} />
      <span>{errors?.itemPurpose?.message}</span>

      <Inputs type="date" text="사용승인일" {...register("itemApproval")} />
      <span>{errors?.itemApproval?.message}</span>
      {postType === "Land" && (
        <>
          <Inputs
            type="number"
            text="토지합계면적"
            {...(register("itemTotalAreaLand"), { valueAsNumber: true })}
          />
          <span>{errors?.itemTotalAreaLand?.message}</span>

          <Inputs type="text" text="지목" {...register("itemLandCategory")} />
          <span>{errors?.itemLandCategory?.message}</span>

          <Inputs type="text" text="필지수" {...register("itemField")} />
          <span>{errors?.itemField?.message}</span>
        </>
      )}

      <Inputs
        type="text"
        text="매물 가까운 지하철"
        {...register("itemSubway")}
      />
      <span>{errors?.itemSubway?.message}</span>

      <Inputs
        type="text"
        text="매물 옵션/추가 설명"
        {...register("itemOption")}
      />
      <span>{errors?.itemOption?.message}</span>
    </>
  );
}
