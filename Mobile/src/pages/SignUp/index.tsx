import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Background,
  Container,
  TopBorder,
  Title,
  Back,
  BackText,
} from './styles';

import logo from '../../assets/logo.png';
import bgDetail from '../../assets/bg_detail.png';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Informe um nome.'),
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um e-mail válido.'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso.',
          'Você já pode fazer login na aplicação.'
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao fazer cadastro',
          'Ocorreu um erro ao fazer o seu cadastro, verifique seus dados'
        );
      }
    },
    [navigation]
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

            <Title>Faça seu cadastro</Title>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
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
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Cadastrar
              </Button>
            </Form>

            <Back
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Icon name="back" size={20} color="#ff9000" />
              <BackText>Voltar para login</BackText>
            </Back>
          </Container>
        </Background>
      </ScrollView>
    </>
  );
};

export default SignUp;
