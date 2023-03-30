import { useFocusRing } from '@react-native-aria/focus';
import React, { createContext, forwardRef } from 'react';
import { composeEventHandlers } from '@gluestack-ui/utils';
import {
  useFocus,
  useHover,
  useIsPressed,
} from '@gluestack-ui/react-native-aria';
import { useButton } from '@react-aria/button';

import type { IButtonProps } from './types';

export const ButtonContext = createContext<any>({});

export const Button = <T,>(StyledButton: React.ComponentType<T>) =>
  forwardRef(
    (
      {
        children,
        isDisabled,
        isHovered: isHoveredProp,
        isPressed: isPressedProp,
        isFocused: isFocusedProp,
        isFocusVisible: isFocusVisibleProp,
        ...props
      }: T & IButtonProps,
      ref: any
    ) => {
      // ref: any
      const { isFocusVisible, focusProps: focusRingProps }: any =
        useFocusRing();
      const { pressableProps, isPressed } = useIsPressed();
      // let { buttonProps } = useButton(props, ref);
      const { isFocused, focusProps } = useFocus();
      const { isHovered, hoverProps }: any = useHover();
      // console.log('isHovered', pressableProps, buttonProps);
      return (
        <StyledButton
          ref={ref}
          accessibilityRole={props?.accessibilityRole || 'button'}
          states={{
            hover: isHoveredProp || isHovered,
            focus: isFocusedProp || isFocused,
            active: isPressedProp || isPressed,
            disabled: isDisabled,
            focusVisible: isFocusVisibleProp || isFocusVisible,
          }}
          disabled={isDisabled}
          {...(props as T)}
          // {...buttonProps}
          onPressIn={composeEventHandlers(
            props?.onPressIn,
            pressableProps.onPressIn
          )}
          onPressOut={composeEventHandlers(
            props?.onPressOut,
            pressableProps.onPressOut
          )}
          // @ts-ignore - web only
          onHoverIn={composeEventHandlers(
            props?.onHoverIn,
            hoverProps.onHoverIn
          )}
          // @ts-ignore - web only
          onHoverOut={composeEventHandlers(
            props?.onHoverOut,
            hoverProps.onHoverOut
          )}
          // @ts-ignore - web only
          onFocus={composeEventHandlers(
            composeEventHandlers(props?.onFocus, focusProps.onFocus),
            focusRingProps.onFocus
          )}
          // @ts-ignore - web only
          onBlur={composeEventHandlers(
            composeEventHandlers(props?.onBlur, focusProps.onBlur),
            focusRingProps.onBlur
          )}
          // ref={ref}
        >
          {children}
        </StyledButton>
      );
    }
  );
