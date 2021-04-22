import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isAvailable: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  align-items: center;

  div {
    list-style: none;
    display: flex;
    width: 240px;
    float: left;
    padding-right: 60px;

    li {
      padding: 10px 20px;
      background: #28262e;
      margin: 10px auto;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.4s;

      &:hover {
        background: #ff9000;
      }

      ${props =>
        props.isFocused &&
        css`
          border-color: #ff9000;
          background: ${shade(0.2, '#ff9000')};
        `}

      ${props =>
        props.isFilled &&
        css`
          color: #ff9000;
        `}

        ${props =>
        props.isAvailable &&
        css`
          background: transparent;
          cursor: not-allowed;

          &:hover {
            background: none;
          }
        `}
    }
  }
`;

export const List = styled.div``;
