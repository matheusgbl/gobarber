import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #312e38;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 24px;
`;

export const Title = styled.Text`
  font-size: 21px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 140px;
`;

export const UserAvatar = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 98px;
  align-self: center;
`;
