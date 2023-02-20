import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
export default function Home() {
  return (
    <div>
      <Heading>welcom to next</Heading>
    </div>
  );
}

const Heading = styled.h1`
  color: ${({ theme }) => theme.font.logo};
  font-size: 100px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
const Divdiv = styled.button``;
