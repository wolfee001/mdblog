import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useFilePicker } from 'use-file-picker';
import { deleteUser, modifyUser } from '../redux/apiCalls';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ModifyInfoContainer = styled.div`
    width: 90%;
    max-width: 500px;
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    &:disabled {
      background-color: rgba(128, 128, 128, 0.4);
      color: #777
    }
`;

const AvatarContainer = styled.div`
    flex: 2;
`;

const ModifyUser = () => {
  const history = useHistory();
  const user = useSelector(state => state.localSettings.user.currentUser?.user || null);
  const jwt = useSelector(state => state.localSettings.user.currentUser?.accessToken || null);

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user, history]);

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 2 // in megabytes
  });

  const [modifiedUser, setModifiedUser] = useState({});
  const dispatch = useDispatch();

  const authState = useSelector(state => state.authenticationState);

  useEffect(() => {
    if (filesContent.length) {
      setModifiedUser(u => { return { ...u, avatar: filesContent[0].content }; });
    }
  }, [filesContent]);

  return (
    <Container>
      {user &&
        <ModifyInfoContainer>
          <TitleGroup>
            <Title>Modify user</Title>
            {authState.error && <ErrorText>Something went wrong!</ErrorText>}
          </TitleGroup>
          <InputGroup>
            <InputTitle>Username</InputTitle>
            <InputTitle>{user.username}</InputTitle>
          </InputGroup>
          <InputGroup>
            <InputTitle>Email</InputTitle>
            <Input value={modifiedUser.email || user.email} onChange={(event) => { setModifiedUser(u => { return { ...u, email: event.target.value }; }); }} />
          </InputGroup>
          <InputGroup>
            <InputTitle>Password</InputTitle>
            <Input value={modifiedUser.password || 'ILoveAbby123'} type='password' onChange={(event) => { setModifiedUser(u => { return { ...u, password: event.target.value }; }); }} />
          </InputGroup>
          <InputGroup>
            <InputTitle>Name</InputTitle>
            <Input value={modifiedUser.name || user.name} onChange={(event) => { setModifiedUser(u => { return { ...u, name: event.target.value }; }); }} />
          </InputGroup>
          <InputGroup>
            <InputTitle>Avatar</InputTitle>
            <AvatarContainer>
              <Avatar value={user.username} round style={{ cursor: 'pointer' }} onClick={() => openFileSelector()} src={modifiedUser.avatar || user.avatar} />
            </AvatarContainer>
          </InputGroup>
          <InputGroup>
            <InputTitle>Email address is public</InputTitle>
            <CheckBoxWrapper>
              <CheckBox id='checkbox' type='checkbox' checked={modifiedUser.emailIsPublic || user.emailIsPublic} onChange={(event) => setModifiedUser(u => { return { ...u, emailIsPublic: event.target.checked }; })} />
              <CheckBoxLabel htmlFor='checkbox' />
            </CheckBoxWrapper>
          </InputGroup>
          <InputGroup>
            <Button onClick={() => modifyUser(dispatch, modifiedUser, jwt)} disabled={authState.fetching}>MODIFY</Button>
            <Button onClick={() => deleteUser(dispatch, jwt)} disabled={authState.fetching}>DELETE</Button>
          </InputGroup>
        </ModifyInfoContainer>}
    </Container>
  );
};

export default ModifyUser;
