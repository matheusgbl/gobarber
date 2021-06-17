/* eslint-disable no-param-reassign */
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

import { ClockLoader } from 'react-spinners';

import Select from 'react-select';

import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { css } from '@emotion/react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  AnimationLeft,
  AnimationLeft1,
  AnimationLeft2,
  AnimationLeft3,
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

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface ProviderAvailable {
  hour: number;
  available: boolean;
  id: string;
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
  service: string;
  date: string;
  provider_id: string;
}

const UserDashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [color] = useState('#ff9000');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [, setAppointments] = useState<Appointment[]>([]);
  const [barbers, setBarbers] = useState<Barbers[]>([]);
  const [providerHour, setProviderHour] = useState<ProviderAvailable[]>([]);

  const [serviceVisible, setServiceVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [barberVisible, setBarberVisible] = useState(false);

  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const options = [
    { value: 'Acabamentos', label: '💈 Acabamentos' },
    { value: 'Barba Máquina', label: '💈 Barba Máquina' },
    { value: 'Barba Navalha', label: '💈 Barba Navalha' },
    { value: 'Corte Tesoura', label: '💈 Corte Tesoura' },
    { value: 'Corte Máquina', label: '💈 Corte Máquina' },
    { value: 'Corte Infantil', label: '💈 Corte Infantil' },
    { value: 'Escova Progressiva', label: '💈 Escova Progressiva' },
    { value: 'Sobrancelha', label: '💈 Sobrancelha' },
  ];

  const formattedDate = useMemo(() => {
    const day = selectedDate.getDate().toString();
    const month = JSON.stringify(selectedDate.getMonth() + 1);
    const year = selectedDate.getFullYear().toString();
    const hour = selectedHour.toString();

    const formatted = `${year}-0${month}-${day} ${hour}`;

    return formatted;
  }, [selectedHour, selectedDate]);

  const handleSubmit = useCallback(
    async (data: AppointmentFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          service: Yup.string().required(),
          date: Yup.string().required(),
          provider_id: Yup.string().required(),
        });

        data.service = selectedService;
        data.date = formattedDate;
        data.provider_id = selectedBarber;

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/appointments', data);

        window.scrollTo(0, 0);

        addToast({
          title: 'Agendamento concluído com êxito!',
          description: `Seu agendamento de ${data.service} foi agendado para ${data.date}.`,
          type: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          addToast({
            title: 'Falha ao agendar serviço!',
            description:
              'Ocorreu uma falha ao criar seu agendamento, por favor, verifique os campos e tente novamente.',
            type: 'error',
          });
        }
      }
    },
    [selectedService, formattedDate, selectedBarber, addToast],
  );

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleChangeBarber = useCallback((provider_id: string) => {
    setSelectedBarber(provider_id);
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
    const defaultBarber = barbers
      .map(barber => barber.id)
      .slice(barbers.length - 1)
      .join();
    setSelectedBarber(defaultBarber);
  }, [barbers]);

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

  useEffect(() => {
    setProviderHour([]);
    setLoading(true);
    setTimeout(() => {
      api
        .get<ProviderAvailable[]>(
          `/providers/${selectedBarber}/day-availability`,
          {
            params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            },
          },
        )
        .then(response => {
          setProviderHour(response.data);
          setLoading(false);
        });
    }, 1500);
  }, [selectedBarber, selectedDate]);

  const availableHoursList = useMemo(() => {
    const response = providerHour
      .filter(hours => hours.available)
      .map(hours => {
        const data = {
          hour: hours.hour.toString(),
          id: JSON.stringify(Math.random() * 100),
          available: hours.available,
        };
        if (data.hour >= '10') {
          data.hour = `${data.hour}:00`;
        }
        if (data.hour.startsWith('8') || data.hour.startsWith('9')) {
          data.hour = `0${data.hour}`;
        }
        return data;
      });
    return response;
  }, [providerHour]);

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

  const override = css`
    display: block;
    margin: 90px auto;
  `;

  const nowHour = new Date().getHours();
  const today = new Date().getDate();

  // console.log(selectedDate.getDate() === today);
  console.log(nowHour);

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
          <AnimationLeft>
            <AppointmentSelection
              title="Selecione o tipo de serviço"
              icon={AiOutlineArrowDown}
              onClick={() => setServiceVisible(!serviceVisible)}
            />
          </AnimationLeft>

          <ServiceList isVisible={serviceVisible}>
            <Select
              placeholder="Escolha seu serviço"
              maxMenuHeight={200}
              className="select"
              theme={theme => ({
                ...theme,
                borderRadius: 10,
                colors: {
                  ...theme.colors,
                  primary25: '#222',
                  primary50: '#ff9000',
                  neutral0: '#333',
                  primary: '#ff9000',
                  neutral80: '#fff',
                },
              })}
              options={options}
              onChange={option => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                setSelectedService(option!.value);
              }}
            />
          </ServiceList>

          <AnimationLeft1>
            <AppointmentSelection
              title="Escolha o horário e a data que deseja marcar"
              icon={AiOutlineArrowDown}
              onClick={() => setCalendarVisible(!calendarVisible)}
            />
          </AnimationLeft1>

          <DateAndHour isVisible={calendarVisible}>
            {nowHour >= 17 && today === selectedDate.getDate() ? (
              <h2>Sem horários disponíveis após 17:00H</h2>
            ) : (
              <h2>Horários disponíveis :</h2>
            )}
            <ClockLoader
              loading={loading}
              color={color}
              css={override}
              size={150}
            />
            <Hour className="date-and-hour">
              {availableHoursList.map(hours => (
                <HoursSelection
                  id="hour_list"
                  key={hours.id}
                  hour={hours.hour}
                  onClick={() => setSelectedHour(hours.hour)}
                />
              ))}
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

          <AnimationLeft2>
            <AppointmentSelection
              title="Escolha o barbeiro"
              icon={AiOutlineArrowDown}
              onClick={() => setBarberVisible(!barberVisible)}
            />
          </AnimationLeft2>

          <BarberList isVisible={barberVisible}>
            {barbers.map(barber => (
              <BarberSelection
                key={barber.id}
                value={barber.id}
                name={barber.name}
                avatar_url={barber.avatar_url}
                onCardSelect={handleChangeBarber}
              />
            ))}
          </BarberList>

          <AnimationLeft3>
            <Button type="submit">Confirmar agendamento</Button>
          </AnimationLeft3>
        </Content>
      </Form>
    </Container>
  );
};

export default UserDashboard;
