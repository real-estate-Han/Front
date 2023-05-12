import React, { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';

interface InputProps {
  placeholder?: string;
  type?: string;
  width?: string;
  defaultValue?: string;
  disabled?: boolean;
  text?: string;
  textarea?: boolean;
}

export const Inputs = forwardRef(
  ({ type, width, placeholder, defaultValue, disabled, text, textarea, ...rest }: InputProps, ref: any) => {
    return (
      <StyledDiv role="label" width={width}>
        {textarea ? (
          <TextAreaCustom
            ref={ref}
            placeholder={placeholder || '[ㅇㅁㅇ]b'}
            defaultValue={defaultValue}
            disabled={disabled}
            {...rest}
          />
        ) : (
          <IdInput
            ref={ref}
            placeholder={placeholder || '[ㅇㅁㅇ]b'}
            type={type}
            defaultValue={defaultValue}
            disabled={disabled}
            {...rest}
          ></IdInput>
        )}
        <span>{text}</span>
      </StyledDiv>
    );
  },
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

  &:not(:placeholder-shown) {
    outline: none;
    + span {
      font-family: 'neodgm';
      position: absolute;
      top: 11%;
      left: 3%;
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme?.background || 'white'};
    }
  }
  &:focus {
    outline: none;
    border: 2px solid black; //#1d9bf0 파랑

    + span {
      font-family: 'neodgm';
      position: absolute;
      top: 11%;
      left: 3%;
      color: ${({ theme }) => theme?.font?.regular || 'black'};
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme?.background || 'white'};
    }
  }
`;
const TextAreaCustom = styled.textarea`
  margin: 20px 0 0 0;
  padding: 10px 0 5px 10px;
  border: 1px solid rgb(214, 218, 227);
  border-radius: 5px;
  background-color: transparent;
  font-size: 1.2rem;
  line-height: 24px;
  width: 100%;
  height: 150px;
  &:disabled {
    background-color: rgb(210, 210, 210, 0.3);
  }

  &::placeholder {
    color: transparent;
  }

  &:not(:placeholder-shown) {
    outline: none;
    + span {
      font-family: 'neodgm';
      position: absolute;
      top: 5%;
      left: 3%;
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme?.background || 'white'};
    }
  }
  &:focus {
    outline: none;
    border: 2px solid black; //#1d9bf0 파랑

    + span {
      font-family: 'neodgm';
      position: absolute;
      top: 5%;
      left: 3%;
      color: ${({ theme }) => theme?.font?.regular || 'black'};
      pointer-events: none;
      font-size: 1rem;
      background-color: ${({ theme }) => theme?.background || 'white'};
    }
  }
`;

const StyledDiv = styled.label<{ width?: string | undefined }>`
  display: flex;
  position: relative;
  width: ${({ width }) => width || '100%'};
  margin: auto;
  span {
    position: absolute;
    top: 50%;
    left: 3%;
    color: ${({ theme }) => theme?.font?.regular || 'black'};
    transition: all 0.2s ease;
  }
`;
