import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersHeader,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const UserDashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate]
  );

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

      <ProvidersList
        data={providers}
        ListHeaderComponent={<ProvidersHeader>Barbeiros</ProvidersHeader>}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}>
            {provider.avatar_url ? (
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
            ) : (
              <Avatar.Text
                color="#fff"
                style={{ backgroundColor: '#ff9000' }}
                label={provider.name[0]}
              />
            )}

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={16} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clockcircle" size={16} color="#ff9000" />
                <ProviderMetaText>08:00h às 18:00h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default UserDashboard;
