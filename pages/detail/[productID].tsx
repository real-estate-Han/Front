import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
export default function DetailInto() {
  const router = useRouter();

  return (
    <div>
      <div>{router.query.productID}</div>
    </div>
  );
}
