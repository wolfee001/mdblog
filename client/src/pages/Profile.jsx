import React from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { mainPageArticles } from '../data';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
    width: 90%;
    max-width: 800px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
`;

const DataContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h1`
    margin-bottom: 1rem;
`;

const Email = styled.h4``;

const Hr = styled.hr`
    height: 0;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
`;

const Title = styled.h1``;

const PostList = styled.div`
    flex: 1;
`;

const Profile = () => {
  return (
    <Container>
      <Background>
        <DataContainer>
          <InfoContainer><UserName>jcarter</UserName>
            <Email>jcarter@county-general.org</Email>
          </InfoContainer>
          <Avatar value='carter' round src='https://upload.wikimedia.org/wikipedia/en/9/99/Dr_carter.jpg' />
        </DataContainer>
        <Hr />
        <Title>Articles</Title>
        <PostList>
          {mainPageArticles.map(element => (<PostCard post={element} imagePosition='left' />))}
        </PostList>
      </Background>
    </Container>
  );
};

export default Profile;
