/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-param-reassign */
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
  avatar_url?: string;
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

  const [selectedBarber, setSelectedBarber] = useState(value);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField } = useField(barberId);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!barberRef.current?.value);
  }, []);

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
    });
  }, [fieldName, registerField]);

  console.log(selectedBarber);

  return (
    <>
      <Container
        isFilled={isFilled}
        isFocused={isFocused}
        style={containerStyle}
      >
        <div
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          tabIndex={-1}
          {...rest}
          onClick={() => setSelectedBarber(value)}
        >
          <input
            type="hidden"
            id={fieldName}
            ref={barberRef}
            value={selectedBarber}
          />
          {avatar_url ? (
            <img src={avatar_url} alt={name} />
          ) : (
            <Avatar
              maxInitials={2}
              name={name}
              alt={name}
              className="random-avatar"
              unstyled
            />
          )}
          <strong>{name}</strong>
        </div>
      </Container>
    </>
  );
};

export default SelectBarber;
