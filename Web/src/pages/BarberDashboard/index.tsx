import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Avatar from 'react-avatar';

import {
  AiOutlineClockCircle,
  AiOutlinePoweroff,
  AiOutlineUser,
} from 'react-icons/ai';

import { ClockLoader } from 'react-spinners';
import { css } from '@emotion/react';

import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

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
  const { signOut, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [color] = useState('#ff9000');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    setAppointments([]);
    setLoading(true);
    setTimeout(() => {
      api
        .get<Appointment[]>('/appointments/me', {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        })
        .then(response => {
          const appointmentsFormatted = response.data.map(appointment => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          });
          setAppointments(appointmentsFormatted);
          setLoading(false);
        });
    }, 1500);
  }, [selectedDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return (
        parseISO(appointment.date).getHours() >= 12 &&
        parseISO(appointment.date).getHours() > new Date().getHours()
      );
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const override = css`
    display: block;
    margin: 90px auto;
  `;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <Avatar
                name={user.name}
                alt={user.name}
                className="random-avatar"
                unstyled
              />
            )}
            <div style={{ marginLeft: 16 }}>
              <span>Olá barbeiro,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button style={{ marginRight: -450 }} type="button">
            <Link to="/profile">
              <AiOutlineUser />
            </Link>
          </button>

          <button type="button" onClick={signOut}>
            <AiOutlinePoweroff />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <ClockLoader
            loading={loading}
            color={color}
            css={override}
            size={150}
          />

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Próximo agendamento</strong>
              <section>
                {nextAppointment.user.avatar_url ? (
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />
                ) : (
                  <Avatar
                    name={nextAppointment.user.name}
                    alt={nextAppointment.user.name}
                    className="random-avatar"
                    unstyled
                  />
                )}

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <AiOutlineClockCircle />
                  {nextAppointment.hourFormatted}
                </span>
              </section>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste periodo.</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <AiOutlineClockCircle />
                  {appointment.hourFormatted}
                </span>

                <section>
                  {appointment.user.avatar_url ? (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  ) : (
                    <Avatar
                      name={appointment.user.name}
                      alt={appointment.user.name}
                      className="random-avatar"
                      unstyled
                    />
                  )}

                  <strong>{appointment.user.name}</strong>
                  <span>Tipo de serviço:</span>
                  <span>{appointment.service}</span>
                </section>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste periodo.</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <AiOutlineClockCircle />
                  {appointment.hourFormatted}
                </span>

                <section>
                  {appointment.user.avatar_url ? (
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />
                  ) : (
                    <Avatar
                      name={appointment.user.name}
                      alt={appointment.user.name}
                      className="random-avatar"
                      unstyled
                    />
                  )}
                  <strong>{appointment.user.name}</strong>
                  <span>Tipo de serviço:</span>
                  <span>{appointment.service}</span>
                </section>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default BarberDashboard;
