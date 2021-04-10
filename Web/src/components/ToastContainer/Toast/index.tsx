/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react';
import {
  AiOutlineAlert,
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <AiFillInfoCircle size={21} />,
  error: <AiOutlineAlert size={21} />,
  success: <AiFillCheckCircle size={21} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <AiFillCloseCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
