import React from 'react';

import { Container } from './styles';

interface TolltipProps {
  title: string;
  className?: string;
}

const Tolltip: React.FC<TolltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tolltip;
