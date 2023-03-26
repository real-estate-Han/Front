import React from "react";
import styled from "@emotion/styled";
import { Inputs } from "@components/Inputs";
import { useForm } from "react-hook-form";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_DETAIL_POST } from "@utils/apollo/gqls";
import Swal from "sweetalert2";
import useStore from "@zustand/store";
export interface LoginContentType {
  email: string;
  password: string;
}

const DetailContent = () => {
  const { detailID } = useStore(state => state);
  const { data, loading, error } = useQuery(GET_DETAIL_POST, {
    variables: {
      postId: detailID,
    },
  });
  console.log(data);
  return (
    <div>
      <h1>{detailID}</h1>
    </div>
  );
};

export default DetailContent;
