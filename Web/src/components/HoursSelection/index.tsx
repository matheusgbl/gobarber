import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import 'moment/locale/pt-br';

import { useField } from '@unform/core';
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
  const { fieldName, registerField } = useField(hour);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: hourRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container style={containerStyle} isFocused={isFocused}>
        <div onFocus={handleInputFocus} ref={hourRef} {...rest} tabIndex={-1}>
          <List tabIndex={0}>
            <li key={fieldName}>{hour}</li>
          </List>
        </div>
      </Container>
    </>
  );
};

export default HoursSelection;
