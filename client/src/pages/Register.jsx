import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const RegisterInfoContainer = styled.div`
    width: 90%;
    max-width: 500px;
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

const CheckBoxWrapper = styled.div`
    position: relative;
    flex: 2;
`;

const CheckBoxLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 15px;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: rgba(255, 255, 255, 0.4);
        transition: 0.2s;
        border: 1px solid black;
    }
`;
const CheckBox = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 42px;
    height: 26px;
    &:checked + ${CheckBoxLabel} {
        background: lightblue;
        &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            margin-left: 19px;
            transition: 0.2s;
        }
    }
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

const Register = () => {
  return (
    <Container>
      <RegisterInfoContainer>
        <Title>Register</Title>
        <InputGroup>
          <InputTitle>Username</InputTitle>
          <Input placeholder='carter' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Email</InputTitle>
          <Input placeholder='jcarter@county-general.org' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Password</InputTitle>
          <Input placeholder='ILoveAbby123' type='password' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Name</InputTitle>
          <Input placeholder='John Carter' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Avatar</InputTitle>
          <Avatar value='carter' round style={{ flex: 2 }} src='https://upload.wikimedia.org/wikipedia/en/9/99/Dr_carter.jpg' />
        </InputGroup>
        <InputGroup>
          <InputTitle>Email address is public</InputTitle>
          <CheckBoxWrapper>
            <CheckBox id='checkbox' type='checkbox' />
            <CheckBoxLabel htmlFor='checkbox' />
          </CheckBoxWrapper>
        </InputGroup>
        <InputGroup>
          <Button>REGISTER</Button>
        </InputGroup>
      </RegisterInfoContainer>
    </Container>
  );
};

export default Register;
