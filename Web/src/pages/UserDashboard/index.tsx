/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ServiceList,
  DateAndHour,
  Hour,
  Calendar,
  BarberList,
} from './styles';

import logo from '../../assets/logo.svg';

import BarberSelection from '../../components/BarberSelection';
import AppointmentSelection from '../../components/AppointmentSelection';
import Button from '../../components/Button';
import HoursSelection from '../../components/HoursSelection';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';

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
  id: string;
  name: string;
  isBarber: boolean;
  avatar_url: string;
}

interface AppointmentFormData {
  provider_id: string;
  service: string;
  date: string;
}

const UserDashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [, setAppointments] = useState<Appointment[]>([]);
  const [barbers, setBarbers] = useState<Barbers[]>([]);

  const [serviceVisible, setServiceVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [barberVisible, setBarberVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: AppointmentFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          service: Yup.string().required('Selecione um serviço.'),
          date: Yup.string().required('Informe uma data.'),
          provider_id: Yup.string().required(),
        });

        console.log(data.provider_id);

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/appointments', data);

        addToast({
          type: 'success',
          title: 'teste',
          description: 'Dapadale na narguila!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao confirmar agendamento',
          description:
            'Ocorreu um erro ao fazer o agendamento, verifique os dados!',
        });
      }
    },
    [addToast],
  );

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
    api.get<Barbers[]>('/providers').then(response => {
      const showBarbers = response.data.filter(barber => barber.isBarber);
      setBarbers(showBarbers);
    });
  }, []);

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

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile key={user.id}>
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

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <AppointmentSelection
            title="Selecione o tipo de serviço"
            icon={AiOutlineArrowDown}
            onClick={() => setServiceVisible(!serviceVisible)}
          />
          <ServiceList isVisible={serviceVisible}>
            <Input name="service" />
          </ServiceList>
          <AppointmentSelection
            title="Escolha o horário e a data que deseja marcar"
            icon={AiOutlineArrowDown}
            onClick={() => setCalendarVisible(!calendarVisible)}
          />
          <DateAndHour isVisible={calendarVisible}>
            <Hour className="date-and-hour">
              <h2>Horários disponíveis :</h2>
              <HoursSelection hour="08:00" />
              <HoursSelection hour="09:00" />
              <HoursSelection hour="10:00" />
              <HoursSelection hour="11:00" />
              <HoursSelection hour="12:00" />
              <HoursSelection hour="13:00" />
              <HoursSelection hour="14:00" />
              <HoursSelection hour="15:00" />
              <HoursSelection hour="16:00" />
              <HoursSelection hour="17:00" />
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

          <AppointmentSelection
            title="Escolha o barbeiro"
            icon={AiOutlineArrowDown}
            onClick={() => setBarberVisible(!barberVisible)}
          />

          <BarberList isVisible={barberVisible}>
            {barbers.map(barber => (
              <BarberSelection
                key={barber.id}
                barberId="provider_id"
                value={barber.id}
                name={barber.name}
                avatar_url={barber.avatar_url}
              />
            ))}
          </BarberList>

          <Button type="submit">Confirmar agendamento</Button>
        </Content>
      </Form>
    </Container>
  );
};

export default UserDashboard;
