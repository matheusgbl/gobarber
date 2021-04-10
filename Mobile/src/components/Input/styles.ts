import styled, { css } from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 90%;
  height: 50px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(AntIcon)`
  margin-right: 10px;
`;
