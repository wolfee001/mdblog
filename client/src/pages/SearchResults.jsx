import React from 'react';
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

const Title = styled.h1``;

const PostList = styled.div`
    flex: 1;
`;

const SearchResults = ({ title }) => {
  return (
    <Container>
      <Background>
        <Title>{title}</Title>
        <PostList>
          {mainPageArticles.map(element => (<PostCard post={element} imagePosition='left' />))}
        </PostList>
      </Background>
    </Container>
  );
};

export default SearchResults;
