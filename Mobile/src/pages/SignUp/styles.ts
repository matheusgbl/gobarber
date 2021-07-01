import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Background = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  position: absolute;
  width: 85%;
  top: 10%;
  background: #312e38;
  border-radius: 20px;
  height: 700px;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 140 : 40}px;
`;

export const TopBorder = styled.View`
  flex: 2;
  z-index: 1;
  top: -2px;
  width: 80px;
  background: #ff7b4a;
  position: absolute;
  border: 2px solid #ff7b4a;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 54px 0 34px;
`;

export const Label = styled.Text`
  color: #fff;
  display: flex;
  position: absolute;
  bottom: 70px;
  right: 2px;
`;

export const Back = styled.TouchableOpacity`
  left: 0;
  top: 80px;
  right: 0;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 10px;
`;
