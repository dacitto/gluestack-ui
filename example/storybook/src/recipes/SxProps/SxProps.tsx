import React from 'react';

import { Text, View } from 'react-native';
import { styled } from '@dank-style/react';
import { Wrapper } from '../../components/Wrapper';
const StyledSxProps = styled(
  View,
  {
    baseStyle: {
      style: {},
    },
  },
  {}
);

const StyledText = styled(
  Text,
  {},
  {
    ancestorStyle: ['_text'],
  }
);

export function SxProps({ ...args }) {
  return (
    <Wrapper>
      <StyledSxProps
        sx={{
          style: {
            bg: '$primary500',
            w: '$40',
            h: '$40',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <StyledText sx={{ style: { color: '$white' } }}>
          This is text
        </StyledText>
      </StyledSxProps>
    </Wrapper>
  );
}
