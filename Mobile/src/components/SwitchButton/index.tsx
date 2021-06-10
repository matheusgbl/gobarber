/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface SwitchButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  label?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ name, value, label, ...rest }) => {
  const switchRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef,
      getValue: (ref: { current: { checked: any } }) => {
        return ref.current.checked;
      },
      setValue: (ref: { current: { checked: any } }, value: any) => {
        ref.current.checked = value;
      },
    });
  }, [fieldName, registerField, defaultValue, defaultChecked]);

  return (
    <Container>
      <label htmlFor={fieldName} className="switch">
        <input
          defaultChecked={defaultChecked}
          ref={switchRef}
          value={value}
          type="checkbox"
          id={fieldName}
          {...rest}
        />
        <span className="slider round" />
      </label>

      <label className="label-barber" htmlFor={fieldName} key={fieldName}>
        {label}
      </label>
    </Container>
  );
};

export default SwitchButton;
