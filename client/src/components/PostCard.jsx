import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Info = styled.div`
    margin: 10px 5px 10px 5px;
    padding: 5px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Title = styled.h4`
    margin-top: 5px;
`;

const Author = styled.h5`
    margin-top: 5px;
`;

const Short = styled.p`
    margin-top: 5px;
    font-size: 14px;
`;

const PostCard = ({ post }) => {
  return (
    <Container>
      <Info>
        <Image src={post.img} />
        <Title>{post.title}</Title>
        <Author>{post.author}</Author>
        <Short>{post.short}</Short>
      </Info>
    </Container>
  );
};

export default PostCard;
