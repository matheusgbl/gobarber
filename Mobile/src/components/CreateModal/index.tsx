/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { Avatar, Modal } from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

import {
  ModalTitle,
  ModalAvatar,
  ModalInfo,
  ModalDetails,
  ModalUser,
  ModalService,
  ModalDate,
} from './styles';

interface ModalProps {
  visible: boolean;
  dismiss: () => void;
  service: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export const CreateModal: React.FC<ModalProps> = ({
  visible,
  dismiss,
  service,
  hourFormatted,
  user,
}) => {
  const modalStyle = {
    backgroundColor: '#3b3b47',
    padding: 20,
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 100,
    height: 150,
  };

  return (
    <Modal
      visible={visible}
      onDismiss={dismiss}
      contentContainerStyle={modalStyle}>
      <Icon
        name="close"
        onPress={dismiss}
        size={20}
        color="#ff9000"
        style={{
          marginLeft: 'auto',
          bottom: 10,
        }}
      />
      <ModalTitle>Detalhes do agendamento :</ModalTitle>
      <ModalInfo>
        {user?.avatar_url ? (
          <ModalAvatar source={{ uri: user?.avatar_url }} />
        ) : (
          <Avatar.Text
            color="#fff"
            style={{
              backgroundColor: '#ff9000',
              bottom: 12,
            }}
            label={user?.name[0]}
          />
        )}
        <ModalDetails>
          <ModalUser>Cliente: {user?.name}</ModalUser>
          <ModalService>Serviço: {service}</ModalService>
          <ModalDate>Horário: {hourFormatted}</ModalDate>
        </ModalDetails>
      </ModalInfo>
    </Modal>
  );
};
