import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'moment/locale/pt-br';

import moment from 'moment';
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
  const [isFilled, setIsFilled] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const { fieldName, registerField } = useField(hour);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!hourRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: hourRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  moment().locale('ptbr');
  const nowHour = moment().format('LT');

  const availableHour = useMemo(() => {
    if (nowHour < hour.toString()) {
      return hour;
    }
    return setIsAvailable(true);
  }, [hour, nowHour]);

  return (
    <>
      <Container
        style={containerStyle}
        isFilled={isFilled}
        isFocused={isFocused}
        isAvailable={isAvailable}
      >
        <div
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={hourRef}
          {...rest}
          tabIndex={-1}
        >
          {availableHour ? (
            <List>
              <li key={fieldName}>{hour}</li>
            </List>
          ) : (
            <List>
              <li key={fieldName}>{hour}</li>
            </List>
          )}
        </div>
      </Container>
    </>
  );
};

export default HoursSelection;
