import React, { ForwardedRef, forwardRef } from "react";
import styled from "@emotion/styled";

interface InputProps {
  type: string;
  width?: string;
  defaultValue?: string;
  disabled?: boolean;
  text?: string;
}

export const Inputs = forwardRef(
  (
    { type, defaultValue, disabled, text, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <StyledDiv>
        <IdInput
          ref={ref}
          placeholder="[ㅇㅁㅇ]b"
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          {...rest}
        ></IdInput>
        <span>{text}</span>
      </StyledDiv>
    );
  }
);

const IdInput = styled.input`
  margin: 20px 0 0 0;
  padding: 10px 0 5px 10px;
  border: 1px solid rgb(214, 218, 227);
  border-radius: 5px;
  background-color: transparent;
  font-size: 1.2rem;
  line-height: 24px;
  width: 100%;

  &:disabled {
    background-color: rgb(210, 210, 210, 0.3);
  }

  &::placeholder {
    color: transparent;
  }
  /* &:placeholder-shown {
    + span {
      display: none;
    }
  } */
  &:not(:placeholder-shown) {
    outline: none;
    + span {
      font-family: "neodgm";
      position: absolute;
      top: 11%;
      left: 3%;
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme.background};
    }
  }
  &:focus {
    outline: none;
    border: 2px solid black; //#1d9bf0 파랑

    + span {
      font-family: "neodgm";
      position: absolute;
      top: 11%;
      left: 3%;
      color: ${({ theme }) => theme.font.regular};
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme.background};
    }
  }
`;

const StyledDiv = styled.label<{ width?: string }>`
  display: flex;
  position: relative;
  width: ${({ width }) => width || "100%"};
  margin: auto;
  span {
    position: absolute;
    top: 50%;
    left: 3%;
    /* z-index:  */
    color: ${({ theme }) => theme.font.regular};
    transition: all 0.2s ease;
  }
`;