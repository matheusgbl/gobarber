/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef, useState } from 'react';
import { Image, ScrollView, TextInput, Alert, Switch } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Background,
  Container,
  TopBorder,
  Title,
  Label,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

import logo from '../../assets/logo.png';
import bgDetail from '../../assets/bg_detail.png';
import api from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
  isBarber: boolean;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().required('Senha inválida.'),
          isBarber: Yup.boolean(),
        });

        data.isBarber = isEnabled;
        console.log(data);

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
          isBarber: data.isBarber,
        });

        data.isBarber === false
          ? navigation.navigate('UserDashboard')
          : console.log('not barber');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao tentar se conectar, por favor verifique seus dados e tente novamente.'
        );
      }
    },
    [signIn, navigation, isEnabled]
  );

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}>
        <Background>
          <Image
            source={bgDetail}
            style={{ top: 350, width: 360, height: 600 }}
          />
          <Container>
            <TopBorder />
            <Image source={logo} style={{ marginTop: 50 }} />

            <Title>Faça seu login</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Switch
                trackColor={{ false: '#ccc', true: '#666360' }}
                thumbColor={isEnabled ? '#ff9000' : '#fff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                  marginRight: 'auto',
                  position: 'relative',
                  display: 'flex',
                  maxWidth: 100,
                }}
              />
              <Label>Fazer login como barbeiro</Label>

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Login
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('foi');
              }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
            <CreateAccount
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Icon name="adduser" size={20} color="#ff9000" />
              <CreateAccountText>Criar uma conta</CreateAccountText>
            </CreateAccount>
          </Container>
        </Background>
      </ScrollView>
    </>
  );
};

export default SignIn;
