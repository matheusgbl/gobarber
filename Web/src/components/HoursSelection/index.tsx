import React, { InputHTMLAttributes, useRef, useState } from 'react';
import 'moment/locale/pt-br';

import { Container, List } from './styles';

interface HoursSelectionProps extends InputHTMLAttributes<HTMLInputElement> {
  hour: string;
  containerStyle?: React.CSSProperties;
}

const HoursSelection: React.FC<HoursSelectionProps> = ({
  hour,
  containerStyle = {},
  ...rest
}) => {
  const hourRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Container style={containerStyle} isFocused={isFocused}>
        <div
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          ref={hourRef}
          {...rest}
          tabIndex={-1}
        >
          <List tabIndex={-1}>
            <li>{hour}</li>
          </List>
        </div>
      </Container>
    </>
  );
};

export default HoursSelection;
