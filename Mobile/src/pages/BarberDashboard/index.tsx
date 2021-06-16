/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigation } from '@react-navigation/native';
import { format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar } from 'react-native-paper';
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
  Title,
  TextAppointment,
  AppointmentInfo,
  AppointmentName,
  AppointmentAvatar,
  AppointmentService,
  AppointmentDate,
  NextAppointment,
  MorningAppointments,
  AfternoonAppointments,
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
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
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

        <TextAppointment>Próximo agendamento</TextAppointment>
        {nextAppointment ? (
          <NextAppointment>
            <AppointmentInfo>
              {nextAppointment.user.avatar_url ? (
                <AppointmentAvatar
                  source={{ uri: nextAppointment.user.avatar_url }}
                />
              ) : (
                <Avatar.Text
                  color="#fff"
                  style={{ backgroundColor: '#ff9000', left: -8 }}
                  label={nextAppointment.user.name[0]}
                />
              )}
              <AppointmentName numberOfLines={2}>
                Cliente: {nextAppointment.user.name}
              </AppointmentName>
              <AppointmentService numberOfLines={2}>
                Serviço: {nextAppointment.service}
              </AppointmentService>
              <AppointmentDate>
                Horário: {nextAppointment.hourFormatted}
              </AppointmentDate>
            </AppointmentInfo>
          </NextAppointment>
        ) : (
          <NextAppointment>
            <TextAppointment>Não há agendamentos para hoje</TextAppointment>
          </NextAppointment>
        )}

        <MorningAppointments>
          <Title>Agendamentos da manhã :</Title>
        </MorningAppointments>

        <AfternoonAppointments>
          <Title>Agendamentos da tarde :</Title>
        </AfternoonAppointments>
      </AppointmentContainer>
    </Container>
  );
};

export default BarberDashboard;
