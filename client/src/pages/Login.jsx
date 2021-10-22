import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const LoginInfoContainer = styled.div`
    width: 90%;
    max-width: 400px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
`;

const Title = styled.h1`
    padding-bottom: 1rem;
`;

const InputTitle = styled.h3`
    flex: 1;
`;

const Input = styled.input`
    flex: 2;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid black;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
`;

const InputGroup = styled.div`
    display: flex;
    padding: 1rem;
    align-items: center;
`;

const Button = styled.button`
    flex: 1;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
`;

const Login = () => {
  return (
    <Container>
      <LoginInfoContainer>
        <Title>Login</Title>
        <InputGroup>
          <InputTitle>Username</InputTitle>
          <Input placeholder='carter' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Password</InputTitle>
          <Input placeholder='ILoveAbby123' type='password' />
        </InputGroup>
        <InputGroup>
          <Button>LOGIN</Button>
        </InputGroup>
      </LoginInfoContainer>
    </Container>
  );
};

export default Login;
