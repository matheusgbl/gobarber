import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
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

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <>
      <Container style={containerStyle} isFocused={isFocused}>
        <div onFocus={handleInputFocus} ref={hourRef} {...rest} tabIndex={-1}>
          <List tabIndex={0}>
            <li>{hour}</li>
          </List>
        </div>
      </Container>
    </>
  );
};

export default HoursSelection;
