import { styled } from '@dank-style/react';
import { Svg } from 'react-native-svg';

const IconStyled = styled(
  Svg,
  {
    w: 20,
    h: 20,
    color: '$primary500',
    colorMode: {
      _dark: {
        color: '$muted50',
        h: 16,
        w: 16,
      },
    },
    variants: {
      variant: {
        modalHeader: {
          color: '$muted500',
          h: 16,
          w: 16,
        },
      },
    },
  },
  {
    ancestorStyle: ['_icon'],
    DEBUG: 'STYLED_ICON',
  }
);

export { IconStyled };
export default IconStyled;