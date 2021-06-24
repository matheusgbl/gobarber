/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-duplicates */
import { useNavigation } from '@react-navigation/native';
import { format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Avatar, Provider, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { CreateModal } from '../../components/CreateModal';
import { AppointmentInfo } from '../../components/AppointmentInfo';

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
  AppointmentContainer,
  DateText,
  Title,
  NextAppointmentContainer,
  TextAppointment,
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
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);

  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);

  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => setVisible3(false);

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
        parseISO(appointment.date).getHours() > new Date().getHours()
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
                <NextAppointment key={nextAppointment.id} onPress={showModal1}>
                  <Portal>
                    <CreateModal
                      visible={visible1}
                      dismiss={hideModal1}
                      hourFormatted={nextAppointment.hourFormatted}
                      service={nextAppointment.service}
                      user={nextAppointment.user}
                    />
                  </Portal>
                  <AppointmentInfo
                    user={nextAppointment.user}
                    hourFormatted={nextAppointment.hourFormatted}
                  />
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
                ({ user: morningUser, id, hourFormatted, service }) => (
                  <NextAppointment key={id} onPress={showModal2}>
                    <Portal>
                      <CreateModal
                        visible={visible2}
                        dismiss={hideModal2}
                        hourFormatted={hourFormatted}
                        service={service}
                        user={morningUser}
                      />
                    </Portal>
                    <AppointmentInfo
                      user={morningUser}
                      hourFormatted={hourFormatted}
                    />
                  </NextAppointment>
                )
              )}
            </MorningAppointmentsContainer>

            <AfternoonAppointmentsContainer>
              <Title>Agendamentos da tarde :</Title>
              {afternoonAppointments.map(
                ({ user: afternoonUser, id, hourFormatted, service }) => (
                  <NextAppointment key={id} onPress={showModal3}>
                    <Portal>
                      <CreateModal
                        visible={visible3}
                        dismiss={hideModal3}
                        hourFormatted={hourFormatted}
                        service={service}
                        user={afternoonUser}
                      />
                    </Portal>
                    <AppointmentInfo
                      user={afternoonUser}
                      hourFormatted={hourFormatted}
                    />
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
