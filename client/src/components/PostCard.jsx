import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 10px 10px 15px 10px;
`;

const Image = styled.img``;

const Title = styled.h4``;

const Author = styled.h5``;

const Short = styled.p`
    font-size: 14px;
`;

const PostCard = ({ post }) => {
  return (
    <Container>
      <Image src={post.img} />
      <Title>{post.title}</Title>
      <Author>{post.author}</Author>
      <Short>{post.short}</Short>
    </Container>
  );
};

export default PostCard;
