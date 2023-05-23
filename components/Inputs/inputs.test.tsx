import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Inputs } from './Inputs';

test('props주고 렌더링 잘 되는지', () => {
  const placeholder = '[ㅇㅁㅇ]b';
  const defaultValue = 'default value';
  const text = 'Input text';
  const width = '50%';

  render(
    <Inputs
      type="text"
      width={width}
      defaultValue={defaultValue}
      disabled={false}
      text={text}
      placeholder={placeholder}
    />,
  );

  const inputElement = screen.getByPlaceholderText(placeholder);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue(defaultValue);
  expect(inputElement).toBeEnabled();
  expect(screen.getByText(text)).toBeInTheDocument();
  const inputLavel = screen.getByRole('label');
  expect(inputLavel).toHaveStyle(`width: ${width}`);
});

test('disable 일때 안보이는지', () => {
  const placeholder = '[ㅇㅁㅇ]b';
  const defaultValue = 'default value';
  const text = 'Input text';
  const width = '50%';

  render(
    <Inputs
      type="text"
      width={width}
      defaultValue={defaultValue}
      disabled
      text={text}
      placeholder={placeholder}
    />,
  );

  const inputElement = screen.getByPlaceholderText(placeholder);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeDisabled();
});

it('포커스 상태일때 value 보이는지', async () => {
  const placeholder = '[ㅇㅁㅇ]b';
  const text = 'Input text';

  render(<Inputs type="text" text={text} placeholder={placeholder} />);

  const inputElement = screen.getByPlaceholderText(placeholder);
  await userEvent.type(inputElement, text);
  expect(inputElement).toHaveValue(text);
  expect(screen.getByText(text)).toBeInTheDocument();
});
