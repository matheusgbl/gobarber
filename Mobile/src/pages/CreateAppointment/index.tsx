import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Platform, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import api from '../../services/api';

import {
  Container,
  Header,
  BackBtn,
  HeaderTitle,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ServiceListContainer,
  ServiceList,
  ServiceName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>();

  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  );
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectService = useCallback((value: string) => {
    setSelectedService(value);
  }, []);

  const handleToogleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: unknown, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    []
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        service: selectedService,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente'
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider, selectedService]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const services = [
    { value: 'Acabamentos', label: '💈 Acabamentos' },
    { value: 'Barba Máquina', label: '💈 Barba Máquina' },
    { value: 'Barba Navalha', label: '💈 Barba Navalha' },
    { value: 'Corte Tesoura', label: '💈 Corte Tesoura' },
    { value: 'Corte Máquina', label: '💈 Corte Máquina' },
    { value: 'Corte Infantil', label: '💈 Corte Infantil' },
    { value: 'Escova Progressiva', label: '💈 Escova Progressiva' },
    { value: 'Sobrancelha', label: '💈 Sobrancelha' },
  ];

  return (
    <Container>
      <Header>
        <BackBtn onPress={navigateBack}>
          <Icon name="arrowleft" size={24} color="#9999" />
        </BackBtn>
        <HeaderTitle>Disponibilidade</HeaderTitle>
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}>
                {provider.avatar_url ? (
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />
                ) : (
                  <Avatar.Text
                    color="#fff"
                    size={32}
                    style={{ backgroundColor: '#222' }}
                    label={provider.name[0]}
                  />
                )}
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Title>Selecione o serviço</Title>
        <ServiceListContainer>
          {services.map(({ value, label }) => (
            <ServiceList
              key={value}
              selected={selectedService === value}
              onPress={() => handleSelectService(value)}>
              <ServiceName selected={selectedService === value}>
                {label}
              </ServiceName>
            </ServiceList>
          ))}
        </ServiceListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handleToogleDatePicker}>
            <Icon name="calendar" size={20} color="#3e3b47" />
            <OpenDatePickerButtonText>
              Selecione a data desejada
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
              mode="date"
              is24Hour
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Selecione o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour)}
                  available={available}
                  key={hourFormatted}>
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
          </Section>

          <SectionContent>
            {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
              <Hour
                enabled={available}
                selected={selectedHour === hour}
                onPress={() => handleSelectHour(hour)}
                available={available}
                key={hourFormatted}>
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <Icon name="checkcircle" size={20} color="#3e3b47" />
          <CreateAppointmentButtonText>
            Confirmar agendamento
          </CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
