import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Avatar from 'react-avatar';

import {
  AiOutlineArrowDown,
  AiOutlinePoweroff,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Service,
  ServiceList,
  CalendarSelectDate,
  DateAndHour,
  Hour,
  HourList,
  Calendar,
  Barber,
  BarberList,
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
}

interface Barbers {
  name: string;
  isBarber: boolean;
  avatar_url: string;
}

const UserDashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [barbers, setBarbers] = useState<Barbers[]>([]);

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

  // useEffect(() => {
  //   api.get('/providers').then(response => {
  //     setBarbers(response.data);
  //   });
  // }, []);

  useEffect(() => {
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
      });
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

  // const selectedDateAsText = useMemo(() => {
  //   return format(selectedDate, "'Dia' dd 'de' MMMM", {
  //     locale: ptBR,
  //   });
  // }, [selectedDate]);

  // const selectedWeekDay = useMemo(() => {
  //   return format(selectedDate, 'cccc', {
  //     locale: ptBR,
  //   });
  // }, [selectedDate]);

  const listBarbers = useMemo(() => {
    const barberList = barbers
      .filter(barber => barber.isBarber === true)
      .map(barber => {
        const { name } = barber;

        return name;
      });

    return barberList;
  }, [barbers]);

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
              <span>Bem vindo, </span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button style={{ marginRight: -400 }} type="button">
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
        <Service>
          <h1>
            Selecione o tipo de serviço <AiOutlineArrowDown />
          </h1>
        </Service>
        <ServiceList>
          <span>teste1</span>
          <span>teste1</span>
        </ServiceList>
        <CalendarSelectDate>
          <h1>
            Escolha a data e horário que deseja marcar <AiOutlineArrowDown />
          </h1>
        </CalendarSelectDate>
        <DateAndHour>
          <Hour className="date-and-hour">
            <h2>Horários disponíveis :</h2>
            <HourList>
              <ul>
                <li>08:00</li>
                <li>09:00</li>
                <li>10:00</li>
                <li>11:00</li>
                <li>12:00</li>
                <li>14:00</li>
                <li>15:00</li>
                <li>16:00</li>
                <li>17:00</li>
                <li>18:00</li>
                <li>19:00</li>
                <li>20:00</li>
                <li>21:00</li>
                <li>22:00</li>
              </ul>
            </HourList>
          </Hour>

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
        </DateAndHour>

        <Barber>
          <h1>
            Escolha o seu barbeiro <AiOutlineArrowDown />
          </h1>
        </Barber>
        {listBarbers ? (
          <BarberList>
            {listBarbers.map(barber => (
              <span>{barber}</span>
            ))}
            {barbers
              .filter(barber => barber.isBarber === true)
              .map(barber => (
                <img src={barber.avatar_url} alt={barber.name} />
              ))}
          </BarberList>
        ) : (
          <h2>Não há barbeiros disponíveis no momento!</h2>
        )}
      </Content>
    </Container>
  );
};

export default UserDashboard;
