import React, { forwardRef } from 'react';
import { useCheckbox } from './CheckboxProvider';

const CheckboxIndicator = (StyledCheckboxIndicator: any) =>
  forwardRef(({ children, ...props }: any) => {
    const {
      isChecked,
      isDisabled,
      isHovered,
      isInvalid,
      isReadOnly,
      isPressed,
      isFocused,
      isIndeterminate,
      isFocusVisible,
    } = useCheckbox('CheckboxContext');

    return (
      <StyledCheckboxIndicator
        states={{
          hover: isHovered,
          checked: isChecked,
          disabled: isDisabled,
          focusVisible: isFocusVisible,
          invalid: isInvalid,
          readOnly: isReadOnly,
          pressed: isPressed,
          focused: isFocused,
          indeterminate: isIndeterminate,
        }}
        {...props}
      >
        {children}
      </StyledCheckboxIndicator>
    );
  });
export default CheckboxIndicator;
