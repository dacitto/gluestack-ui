import { Root, Icon, Input as TextInput } from './styled-component';
import { createInput } from '@universa11y/input';
import React from 'react';
import { useState } from 'react';
import { createIcon } from '@universa11y/icon';
import { Wrapper } from '../Wrapper';

const InputTemp = createInput({
  Root,
  Icon,
  Input: TextInput,
});

export const SearchIcon: any = createIcon({
  Root: Icon,
  viewBox: '0 0 24 24',
  d: 'M21.9399 20.5624L15.4474 14.0699C16.4549 12.7675 16.9999 11.175 16.9999 9.49997C16.9999 7.49498 16.2174 5.61498 14.8024 4.19749C13.3874 2.78 11.5025 2 9.49997 2C7.49748 2 5.61248 2.7825 4.19749 4.19749C2.78 5.61248 2 7.49498 2 9.49997C2 11.5025 2.7825 13.3874 4.19749 14.8024C5.61248 16.2199 7.49498 16.9999 9.49997 16.9999C11.175 16.9999 12.765 16.4549 14.0674 15.4499L20.5599 21.9399C20.579 21.959 20.6016 21.9741 20.6264 21.9844C20.6513 21.9947 20.678 22 20.7049 22C20.7318 22 20.7585 21.9947 20.7834 21.9844C20.8083 21.9741 20.8309 21.959 20.8499 21.9399L21.9399 20.8524C21.959 20.8334 21.9741 20.8108 21.9844 20.7859C21.9947 20.761 22 20.7343 22 20.7074C22 20.6805 21.9947 20.6538 21.9844 20.6289C21.9741 20.6041 21.959 20.5815 21.9399 20.5624ZM13.46 13.46C12.4 14.5174 10.995 15.0999 9.49997 15.0999C8.00497 15.0999 6.59998 14.5174 5.53998 13.46C4.48249 12.4 3.89999 10.995 3.89999 9.49997C3.89999 8.00497 4.48249 6.59748 5.53998 5.53998C6.59998 4.48249 8.00497 3.89999 9.49997 3.89999C10.995 3.89999 12.4025 4.47999 13.46 5.53998C14.5174 6.59998 15.0999 8.00497 15.0999 9.49997C15.0999 10.995 14.5174 12.4025 13.46 13.46Z',
});

export const InputGroup = () => {
  const [value, setValue] = useState('Some Random Text');
  return (
    <Wrapper>
      <InputTemp>
        <SearchIcon mt="$1" />
        <InputTemp.Input
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          value={value}
          placeholder="Enter Text here"
        />
        <SearchIcon mt="$1" />
      </InputTemp>
    </Wrapper>
  );
};

export default InputGroup;
