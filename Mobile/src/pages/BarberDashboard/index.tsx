/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-duplicates */
import { useNavigation } from '@react-navigation/native';
import { format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Avatar, Modal, Provider, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
  AppointmentContainer,
  DateText,
  ModalTitle,
  ModalInfo,
  ModalDetails,
  ModalUser,
  ModalService,
  ModalDate,
  ModalButton,
  TextBtn,
  Title,
  NextAppointmentContainer,
  TextAppointment,
  AppointmentInfo,
  AppointmentName,
  AppointmentHour,
  AppointmentAbout,
  AppointmentDetails,
  AppointmentAvatar,
  NextAppointment,
  MorningAppointmentsContainer,
  AfternoonAppointmentsContainer,
} from './styles';

interface Appointment {
  id: string;
  service: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const BarberDashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [today] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const modalStyle = {
    backgroundColor: '#3b3b47',
    padding: 20,
    borderRadius: 10,
    margin: 'auto',
    marginBottom: 100,
    height: 150,
  };

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [today]);

  const todayDateAsText = useMemo(() => {
    return format(today, "'Dia' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }, [today]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return (
        parseISO(appointment.date).getHours() < 12 &&
        parseISO(appointment.date).getHours() > new Date().getHours()
      );
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return (
        parseISO(appointment.date).getHours() >= 12 &&
        parseISO(appointment.date).getHours() >= new Date().getHours()
      );
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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

        <AppointmentContainer>
          <Title>Agendamentos</Title>
          <DateText>{todayDateAsText}</DateText>

          <Provider>
            <NextAppointmentContainer>
              <TextAppointment>Próximo agendamento :</TextAppointment>
              {nextAppointment ? (
                <NextAppointment key={nextAppointment.id} onPress={showModal}>
                  <Portal>
                    <Modal
                      visible={visible}
                      onDismiss={hideModal}
                      contentContainerStyle={modalStyle}>
                      <ModalTitle>Detalhes do agendamento :</ModalTitle>
                      <ModalInfo>
                        {nextAppointment.user.avatar_url ? (
                          <AppointmentAvatar
                            source={{ uri: nextAppointment.user.avatar_url }}
                          />
                        ) : (
                          <Avatar.Text
                            color="#fff"
                            style={{
                              backgroundColor: '#ff9000',
                            }}
                            label={nextAppointment.user.name[0]}
                          />
                        )}
                        <ModalDetails>
                          <ModalUser>
                            Cliente: {nextAppointment.user.name}
                          </ModalUser>
                          <ModalService>
                            Serviço: {nextAppointment.service}
                          </ModalService>
                          <ModalDate>
                            Horário: {nextAppointment.hourFormatted}
                          </ModalDate>
                          <ModalButton onPress={hideModal}>
                            <TextBtn>Voltar</TextBtn>
                          </ModalButton>
                        </ModalDetails>
                      </ModalInfo>
                    </Modal>
                  </Portal>
                  <AppointmentInfo>
                    {nextAppointment.user.avatar_url ? (
                      <AppointmentAvatar
                        source={{ uri: nextAppointment.user.avatar_url }}
                      />
                    ) : (
                      <Avatar.Text
                        color="#fff"
                        style={{
                          backgroundColor: '#ff9000',
                          left: -10,
                        }}
                        label={nextAppointment.user.name[0]}
                      />
                    )}
                    <AppointmentAbout>
                      <AppointmentName>
                        Cliente: {nextAppointment.user.name}
                      </AppointmentName>
                      <AppointmentHour>
                        Horário: {nextAppointment.hourFormatted}
                      </AppointmentHour>
                      <AppointmentDetails>
                        Toque para mais informações !
                      </AppointmentDetails>
                    </AppointmentAbout>
                  </AppointmentInfo>
                </NextAppointment>
              ) : (
                <TextAppointment style={{ fontSize: 13 }}>
                  Não há agendamentos para hoje!
                </TextAppointment>
              )}
            </NextAppointmentContainer>

            <MorningAppointmentsContainer>
              <Title>Agendamentos da manhã :</Title>
              {morningAppointments.map(
                ({ user: morningUser, id, hourFormatted }) => (
                  <NextAppointment key={id}>
                    <AppointmentInfo>
                      {morningUser.avatar_url ? (
                        <AppointmentAvatar
                          source={{ uri: morningUser.avatar_url }}
                        />
                      ) : (
                        <Avatar.Text
                          color="#fff"
                          style={{ backgroundColor: '#ff9000', left: -10 }}
                          label={morningUser.name[0]}
                        />
                      )}
                      <AppointmentAbout>
                        <AppointmentName>
                          Cliente: {morningUser.name}
                        </AppointmentName>
                        <AppointmentHour>
                          Horário: {hourFormatted}
                        </AppointmentHour>
                        <AppointmentDetails>
                          Toque para mais informações !
                        </AppointmentDetails>
                      </AppointmentAbout>
                    </AppointmentInfo>
                  </NextAppointment>
                )
              )}
            </MorningAppointmentsContainer>

            <AfternoonAppointmentsContainer>
              <Title>Agendamentos da tarde :</Title>
              {afternoonAppointments.map(
                ({ user: afternoonUser, id, hourFormatted }) => (
                  <NextAppointment key={id}>
                    <AppointmentInfo>
                      {afternoonUser.avatar_url ? (
                        <AppointmentAvatar
                          source={{ uri: afternoonUser.avatar_url }}
                        />
                      ) : (
                        <Avatar.Text
                          color="#fff"
                          style={{ backgroundColor: '#ff9000', left: -10 }}
                          label={afternoonUser.name[0]}
                        />
                      )}
                      <AppointmentAbout>
                        <AppointmentName>
                          Cliente: {afternoonUser.name}
                        </AppointmentName>
                        <AppointmentHour>
                          Horário: {hourFormatted}
                        </AppointmentHour>
                        <AppointmentDetails>
                          Toque para mais informações !
                        </AppointmentDetails>
                      </AppointmentAbout>
                    </AppointmentInfo>
                  </NextAppointment>
                )
              )}
            </AfternoonAppointmentsContainer>
          </Provider>
        </AppointmentContainer>
      </ScrollView>
    </Container>
  );
};

export default BarberDashboard;
