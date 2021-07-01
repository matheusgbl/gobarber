/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Avatar } from 'react-native-paper';

import { Info, UserAvatar, About, Name, Hour, Details } from './styles';

interface AppointmentInfoProps {
  user: {
    name: string;
    avatar_url: string;
  };
  hourFormatted: string;
}

export const AppointmentInfo: React.FC<AppointmentInfoProps> = ({
  user,
  hourFormatted,
}) => {
  return (
    <Info>
      {user.avatar_url ? (
        <UserAvatar source={{ uri: user.avatar_url }} />
      ) : (
        <Avatar.Text
          color="#fff"
          style={{ backgroundColor: '#ff9000', left: -10 }}
          label={user.name[0]}
        />
      )}
      <About>
        <Name>Cliente: {user.name}</Name>
        <Hour>Horário: {hourFormatted}</Hour>
        <Details>Toque para mais informações !</Details>
      </About>
    </Info>
  );
};
