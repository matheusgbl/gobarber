import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ModalTitle = styled.Text`
  text-align: center;
  width: 350px;
  color: #fff;
  bottom: 10px;
`;

export const ModalAvatar = styled.Image`
  width: 60px;
`;

export const ModalInfo = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ModalDetails = styled.View`
  align-items: center;
  justify-content: center;
  width: 230px;
`;

export const ModalUser = styled.Text`
  color: #fff;
`;

export const ModalService = styled.Text`
  color: #fff;
`;

export const ModalDate = styled.Text`
  color: #fff;
`;

export const ModalButton = styled(RectButton)`
  align-items: center;
  background: #ff9000;
  top: 15px;
  padding: 2px 12px;
  border-radius: 7px;
`;

export const TextBtn = styled.Text`
  color: #fff;
`;
