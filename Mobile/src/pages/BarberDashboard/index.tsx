import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
} from './styles';

const BarberDashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useAuth();
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <ProfileButton onPress={navigateToProfile}>
          {user.avatar_url ? (
            <UserAvatar source={{ uri: user.avatar_url }} />
          ) : (
            <Avatar.Text
              color="#fff"
              style={{ backgroundColor: '#ff9000' }}
              label={user.name[0]}
            />
          )}
        </ProfileButton>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <Icon
          name="logout"
          onPress={signOut}
          size={24}
          color="#ad1222"
          style={{
            marginRight: 10,
          }}
        />
      </Header>
    </Container>
  );
};

export default BarberDashboard;
