import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  flex: 1;
  padding: 15px 15px;
  background: #28262e;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.4s;
  margin-bottom: 20px;

  transition: 1s all;
  border: 2px solid #28262e;
  outline: 0;

  &:hover {
    background: ${shade(0.2, '#28262e')};
  }

  h1 {
    color: #fff;
    align-items: center;
    justify-content: center;
    margin: 0;
    display: flex;

    svg {
      margin-left: auto;
    }
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      background: ${shade(0.2, '#28262e')};
      svg {
        transform: rotate(180deg);
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
`;
