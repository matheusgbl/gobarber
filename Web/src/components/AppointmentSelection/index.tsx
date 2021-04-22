import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface AppointmentSelectionProps
  extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const AppointmentSelection: React.FC<AppointmentSelectionProps> = ({
  title,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const selectionRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectionRef.current?.value);
  }, []);

  return (
    <>
      <Container
        style={containerStyle}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <div
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={selectionRef}
          {...rest}
          tabIndex={-1}
        >
          <h1>
            {title} {Icon && <Icon size={30} />}
          </h1>
        </div>
      </Container>
    </>
  );
};

export default AppointmentSelection;
