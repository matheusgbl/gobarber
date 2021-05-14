import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  align-items: center;

  div {
    list-style: none;
    width: 80px;
    margin-left: 10px;

    li {
      ${props =>
        props.isFocused &&
        css`
          background: ${shade(0.2, '#ff9000')};
        `}
    }
  }
`;

export const List = styled.div``;
