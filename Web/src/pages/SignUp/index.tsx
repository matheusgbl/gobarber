import React, { useCallback, useRef } from 'react';
import {
  AiOutlineArrowLeft,
  AiFillMail,
  AiFillLock,
  AiOutlineUser,
} from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SwitchButton from '../../components/SwitchButton';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  isBarber: true | false;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Informe um nome.'),
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um e-mail válido.'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          isBarber: Yup.boolean().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer login no GoBarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao fazer cadastro',
          description:
            'Ocorreu um erro ao fazer o seu cadastro, verifique seus dados',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={AiOutlineUser} placeholder="Nome" />
            <Input name="email" icon={AiFillMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={AiFillLock}
              type="password"
              placeholder="Senha"
            />

            <SwitchButton
              value="sim"
              name="isBarber"
              label="Realizar cadastro como barbeiro"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <AiOutlineArrowLeft size={18} />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
