import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #312e38;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
  margin-right: auto;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const AppointmentContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  padding: 20px;
  color: #ff9000;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const DateText = styled.Text`
  padding: 0 20px;
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const ModalTitle = styled.Text``;

export const ModalInfo = styled.Text``;

export const ModalAvatar = styled.Text``;

export const ModalUser = styled.Text``;

export const ModalService = styled.Text``;

export const ModalDate = styled.Text``;

export const ModalButton = styled.Text``;

export const TextAppointment = styled.Text`
  padding: 20px 30px;
  color: #fff;
  font-size: 16px;
`;

export const NextAppointment = styled(RectButton)`
  width: 90%;
  margin: 0 auto;
  background: #3b3b47;
  opacity: 0.9;
  border-radius: 10px;
`;

export const AppointmentInfo = styled.View`
  padding: 20px 30px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const AppointmentAbout = styled.View`
  align-items: center;
`;

export const AppointmentAvatar = styled.Image`
  width: 60px;
`;

export const AppointmentName = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const AppointmentDetails = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  color: #ff9000;
`;

export const NextAppointmentContainer = styled.View``;
export const MorningAppointmentsContainer = styled.View``;
export const AfternoonAppointmentsContainer = styled.View``;
