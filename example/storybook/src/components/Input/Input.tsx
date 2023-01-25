import { Root, Icon, Group } from './styled-component';
import { createInput } from '@universa11y/input';
import React from 'react';
import { useState } from 'react';

const InputTemp = createInput({
  Root,
  Icon,
  Group,
});

export const Input = () => {
  const [value, setValue] = useState('Some Random Text');
  return (
    <>
      <InputTemp
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Enter Text here"
      ></InputTemp>
    </>
  );
};