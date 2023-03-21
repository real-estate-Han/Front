import { Inputs } from "@components/Inputs";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { postType } from "@utils/type";

interface InputProps {
  register: UseFormRegister<postType>;
  errors: FieldErrors<postType>;
}

export default function PostItemList({ register, errors }: InputProps) {
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

      <Inputs type="text" text="매물종류" {...register("itemType")} />
      <span>{errors?.itemType?.message}</span>
      <Inputs type="text" text="매물상태" {...register("itemStatus")} />
      <span>{errors?.itemStatus?.message}</span>

      <Inputs
        type="number"
        text="매물층수"
        {...register("itemFloor", { valueAsNumber: true })}
      />
      <span>{errors?.itemFloor?.message}</span>
      <Inputs
        type="number"
        text="매물보증금"
        {...register("itemDeposit", { valueAsNumber: true })}
      />
      <span>{errors?.itemDeposit?.message}</span>
      <Inputs
        type="number"
        text="매물월세"
        {...register("itemMonthly", { valueAsNumber: true })}
      />
      <span>{errors?.itemMonthly?.message}</span>
      <Inputs
        type="number"
        text="매물관리비"
        {...register("itemManagement", { valueAsNumber: true })}
      />
      <span>{errors?.itemManagement?.message}</span>
      <Inputs
        type="number"
        text="매물매매가"
        {...register("itemSale", { valueAsNumber: true })}
      />
      <span>{errors?.itemSale?.message}</span>
      <Inputs
        type="number"
        text="매물전세보증금"
        {...register("itemJense", { valueAsNumber: true })}
      />
      <span>{errors?.itemJense?.message}</span>
      <Inputs
        type="number"
        text="매물토지면적"
        {...register("itemAreaLand", { valueAsNumber: true })}
      />
      <span>{errors?.itemAreaLand?.message}</span>
      <Inputs
        type="number"
        text="매물건물면적"
        {...register("itemAreaBuilding", { valueAsNumber: true })}
      />
      <span>{errors?.itemAreaBuilding?.message}</span>
      <Inputs type="text" text="매물용도" {...register("itemPurpose")} />
      <span>{errors?.itemPurpose?.message}</span>

      <Inputs type="date" text="매물입주가능날짜" {...register("itemMovein")} />
      <span>{errors?.itemMovein?.message}</span>
      <Inputs
        type="text"
        text="매물 가까운 지하철"
        {...register("itemSubway")}
      />
      <span>{errors?.itemSubway?.message}</span>
      {/* <Inputs type="text" text="매물 설명" {...register("itemDescription")} />
      <span>{errors?.itemDescription?.message}</span> */}
      <Inputs type="text" text="매물 옵션" {...register("itemOption")} />
      <span>{errors?.itemOption?.message}</span>
    </>
  );
}
