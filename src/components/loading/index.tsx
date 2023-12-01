import React from 'react';
import { Container, LoadingComponent } from './styles';

export default function Loading() {
  return (
    <Container>
      <LoadingComponent color="#00ff00" size={"large"} />
    </Container>
  );
}

