/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Avatar from 'react-avatar';

import { Container } from './styles';

interface SelectBarberProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  barberId: string;
  avatar_url: string;
  containerStyle?: React.CSSProperties;
}

const SelectBarber: React.FC<SelectBarberProps> = ({
  name,
  value,
  barberId,
  avatar_url,
  containerStyle = {},
  ...rest
}) => {
  const barberRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField } = useField(barberId);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!barberRef.current?.value);
  }, []);

  const defaultInputValue = value || defaultValue;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: barberRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container
        isFilled={isFilled}
        style={containerStyle}
        isFocused={isFocused}
      >
        <input
          type="hidden"
          id={fieldName}
          ref={barberRef}
          defaultValue={defaultInputValue}
          {...rest}
        />
        <div
          key={value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          tabIndex={-1}
        >
          {avatar_url ? (
            <img src={avatar_url} alt={name} />
          ) : (
            <Avatar name={name} alt={name} className="random-avatar" unstyled />
          )}
          <strong>{name}</strong>
        </div>
      </Container>
    </>
  );
};

export default SelectBarber;
