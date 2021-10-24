import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { login } from '../redux/apiCalls';

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

const ErrorText = styled.h3`
    padding-bottom: 1rem;
    color: red;
`;

const TitleGroup = styled.div`
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    &:disabled {
      background-color: rgba(128, 128, 128, 0.4);
      color: #777
    }
`;

const Login = () => {
  const [loginData, setLoginData] = useState({ username: null, password: null });
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector(state => state.authenticationState);
  const user = useSelector(state => state.localSettings.user);

  useEffect(() => {
    if (user.currentUser) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <Container>
      <LoginInfoContainer>
        <TitleGroup>
          <Title>Login</Title>
          {authState.error && <ErrorText>Username or password invalid!</ErrorText>}
        </TitleGroup>
        <InputGroup>
          <InputTitle>Username</InputTitle>
          <Input placeholder='carter' onChange={(event) => { setLoginData(u => { return { ...u, username: event.target.value }; }); }} />
        </InputGroup>
        <InputGroup>
          <InputTitle>Password</InputTitle>
          <Input placeholder='ILoveAbby123' type='password' onChange={(event) => { setLoginData(u => { return { ...u, password: event.target.value }; }); }} />
        </InputGroup>
        <InputGroup>
          <Button onClick={() => login(dispatch, loginData)} disabled={authState.fetching}>LOGIN</Button>
        </InputGroup>
      </LoginInfoContainer>
    </Container>
  );
};

export default Login;
