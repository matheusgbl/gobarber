import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #28262e;
  padding: 10px 20px;
  margin-right: 10px;
  align-items: center;
  border-radius: 8px;
  width: 840px;

  transition: 0.2s all;
  border: 2px solid #232129;
  outline: 0;

  &:hover {
    background: ${shade(0.2, '#28262e')};
  }

  .random-avatar {
    display: inline-flex;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: #ff9000;

    span {
      display: flex;
      font-size: 18px;
      margin: 0 auto;
    }
  }

  strong {
    padding-left: 10px;
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      background: ${shade(0.2, '#28262e')};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
    div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    width: 200px;
    img {
      border-radius: 50%;
      border: 1px solid #fff;
      justify-content: center;
      width: 60px;
      height: 60px;
    }
  }
`;
