import React, { InputHTMLAttributes, useRef, useState } from 'react';
import Avatar from 'react-avatar';

import { Container } from './styles';

interface SelectBarberProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  avatar_url?: string;
  containerStyle?: React.CSSProperties;
  onCardSelect: (value: string) => void;
}

const SelectBarber: React.FC<SelectBarberProps> = ({
  name,
  value,
  avatar_url,
  containerStyle = {},
  onCardSelect,
  ...rest
}) => {
  const barberRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Container isFocused={isFocused} style={containerStyle}>
        <div
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={-1}
          {...rest}
          onClick={() => onCardSelect(value)}
        >
          <input type="hidden" id={value} ref={barberRef} value={value} />
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
