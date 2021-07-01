/* eslint-disable import/no-duplicates */
import { useNavigation } from '@react-navigation/native';
import { format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Avatar,
  Provider,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
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

interface ModalProps {
  id: string;
  service: string;
  hourFormatted: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const BarberDashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedService, setSelectedService] = useState<ModalProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(new Date());

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  useEffect(() => {
    setAppointments([]);
    setLoading(true);
    setTimeout(() => {
      api
        .get<Appointment[]>('/appointments/me', {
          params: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
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
      setLoading(false);
    }, 1000);
  }, [date]);

  useEffect(() => {
    setTimeout(() => {
      api
        .get<ModalProps[]>('/appointments/me', {
          params: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          },
        })
        .then((response) => {
          const appointmentsFormatted = response.data.map((appointment) => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          });
          setSelectedService(appointmentsFormatted);
        });
    }, 1000);
  }, [date]);

  const todayDateAsText = useMemo(() => {
    return format(date, "'Dia' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }, [date]);

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

  const nextDay = useCallback(() => {
    const dt = new Date();
    dt.setTime(dt.getTime() + 24 * 60 * 60 * 1000);
    setDate(dt);
  }, []);

  const prevDay = useCallback(() => {
    const dt = new Date();
    setDate(dt);
  }, []);

  const handleService = useCallback((data) => {
    setSelectedService(data);
    setVisible(true);
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          {date.getDate() === new Date().getDate() ? (
            <Icon
              name="right"
              size={20}
              onPress={nextDay}
              style={{
                color: '#ff9000',
                marginLeft: 'auto',
                paddingRight: 20,
                bottom: 35,
              }}
            />
          ) : (
            <Icon
              name="left"
              size={20}
              onPress={prevDay}
              style={{
                color: '#ff9000',
                marginRight: 'auto',
                paddingLeft: 20,
                bottom: 35,
              }}
            />
          )}

          <Provider>
            {selectedService ? (
              <Portal>
                <CreateModal
                  visible={visible}
                  dismiss={hideModal}
                  hourFormatted={selectedService?.hourFormatted}
                  service={selectedService?.service}
                  user={selectedService?.user}
                />
              </Portal>
            ) : (
              <></>
            )}

            <NextAppointmentContainer>
              <TextAppointment>Próximo agendamento :</TextAppointment>
              {nextAppointment ? (
                <NextAppointment
                  key={nextAppointment.id}
                  onPress={() => handleService(nextAppointment)}>
                  <AppointmentInfo
                    user={nextAppointment.user}
                    hourFormatted={nextAppointment.hourFormatted}
                  />
                </NextAppointment>
              ) : (
                <ActivityIndicator animating={loading} color="#ff9000" />
              )}
            </NextAppointmentContainer>

            <MorningAppointmentsContainer>
              <Title>Agendamentos da manhã :</Title>
              {morningAppointments.map((data) => (
                <NextAppointment
                  key={data.id}
                  onPress={() => handleService(data)}>
                  <AppointmentInfo
                    user={data.user}
                    hourFormatted={data.hourFormatted}
                  />
                </NextAppointment>
              ))}
            </MorningAppointmentsContainer>

            <AfternoonAppointmentsContainer>
              <Title>Agendamentos da tarde :</Title>
              {afternoonAppointments.map((data) => (
                <NextAppointment
                  key={data.id}
                  onPress={() => handleService(data)}>
                  <AppointmentInfo
                    user={data.user}
                    hourFormatted={data.hourFormatted}
                  />
                </NextAppointment>
              ))}
            </AfternoonAppointmentsContainer>
          </Provider>
        </AppointmentContainer>
      </ScrollView>
    </Container>
  );
};

export default BarberDashboard;
